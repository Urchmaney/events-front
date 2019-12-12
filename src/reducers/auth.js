import { LOGIN, LOGOUT } from '../constants';

const auth = (state = 'OUT', action) => {
  switch (action.type) {
    case LOGIN:
      return action.token;
    case LOGOUT:
      return 'OUT';
    default:
      return state;
  }
};

export default auth;
