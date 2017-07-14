import { ADD_TASK, DELETE_TASK, MOVE_TASK } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const initial_state = { todo_tasks: [], in_progress_tasks: [], completed_tasks: [] };

const add_task = (state, action) => {
    state.todo_tasks.push(
      {
        text: action.text,
        dueDate: action.dueDate,
        id: Math.random()
      }
    )

    return state;
}

const removeById = (state, action) => {
  var current_tasks = state[action.from];
  const tasks = current_tasks.filter( task => {
    return task.id != action.id;
  });

  state[action.from] = tasks;

  return state;
}

const moveTask = (state, action) => {
  var current_tasks = state[action.from];
  var task_to_move = current_tasks.find(task => {
    return task.id == action.id;
  });
  var the_task_copy = Object.assign({}, task_to_move);

  state[action.to].push(the_task_copy);

  current_tasks = current_tasks.filter(task => {
    return task.id != action.id;
  });

  state[action.from] = current_tasks;

  return state;
}

const tasks = (state = initial_state, action) => {
  let task = null;
  
  if(Object.keys(read_cookie('tasks')).length != 0)
    state = read_cookie('tasks')

  switch (action.type) {
    case ADD_TASK:
      task = add_task({ ...state }, action);
      bake_cookie('tasks', task);
      return task;

    case DELETE_TASK:
      task = removeById({ ...state }, action);
      bake_cookie('tasks', task);
      return task;

    case MOVE_TASK:
      task = moveTask({ ...state }, action);
      bake_cookie('tasks', task);
      return task;

    default:
      return state;
  }
}

export default tasks;
