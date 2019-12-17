import { SET_ADMIN } from '../constants';

const isAdmin = (state = false, action) => {
  switch (action.type) {
    case SET_ADMIN:
      return true;
    default:
      return state;
  }
};

export default isAdmin;
