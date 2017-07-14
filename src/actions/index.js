import { ADD_REMAINDER, DELETE_REMAINDER, MOVE_TASK } from "../constants";

export const addRemainder = (text, dueDate) => {
  const action = {
    type: ADD_REMAINDER,
    text,
    dueDate
  }

  return action;
}

export const deleteRemainder = (id, from) => {
  const action = {
    type: DELETE_REMAINDER,
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
