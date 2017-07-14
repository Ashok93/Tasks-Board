import { ADD_REMAINDER, DELETE_REMAINDER } from "../constants";

export const addRemainder = (text, dueDate) => {
  const action = {
    type: ADD_REMAINDER,
    text,
    dueDate
  }

  return action;
}

export const deleteRemainder = (id) => {
  const action = {
    type: DELETE_REMAINDER,
    id
  }

  return action;
}
