import { ADD_REMAINDER, DELETE_REMAINDER, MOVE_TASK } from '../constants';
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
  const remainders = current_tasks.filter( remainder => {
    return remainder.id != action.id;
  });

  state[action.from] = remainders;

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

const remainders = (state = initial_state, action) => {
  let remainder = null;
  state = read_cookie('remainders');

  switch (action.type) {
    case ADD_REMAINDER:
      remainder = add_task({ ...state }, action);
      bake_cookie('remainders', remainder);
      return remainder;

    case DELETE_REMAINDER:
      remainder = removeById({ ...state }, action);
      bake_cookie('remainders', remainder);
      return remainder;

    case MOVE_TASK:
      remainder = moveTask({ ...state }, action);
      bake_cookie('remainders', remainder);
      return remainder;

    default:
      return state;
  }
}

export default remainders;
