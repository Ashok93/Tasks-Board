import { ADD_REMAINDER, DELETE_REMAINDER } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const remainder_fn = (action) => {
    return {
      text: action.text,
      dueDate: action.dueDate,
      id: Math.random()
    }
}

const removeById = (state = [], id) => {
  const remainders = state.filter( remainder => {
    return remainder.id != id;
  });

  return remainders;
}

const remainders = (state = [], action) => {
  let remainder = null;
  state = read_cookie('remainders');

  switch (action.type) {
    case ADD_REMAINDER:
      remainder = [...state, remainder_fn(action)];
      bake_cookie('remainders', remainder);
      return remainder;

    case DELETE_REMAINDER:
      remainder = removeById(state, action.id);
      bake_cookie('remainders', remainder);
      return remainder

    default:
      return state;
  }
}

export default remainders;
