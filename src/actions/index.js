import { ADD_TASK, DELETE_TASK, MOVE_TASK } from "../constants";

export const addTask = (text, dueDate) => {
  const action = {
    type: ADD_TASK,
    text,
    dueDate
  }

  return action;
}

export const deleteTask = (id, from) => {
  const action = {
    type: DELETE_TASK,
    id,
    from
  }

  return action;
}

export const moveTask = (id, from, to) => {
  const action = {
    type: MOVE_TASK,
    id,
    from,
    to
  }

  return action;
}
