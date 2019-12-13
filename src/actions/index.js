import { LOGIN, LOGOUT, ADD_TOKEN } from '../constants';

const login = () => (
  {
    type: LOGIN,
  }
);

const logout = () => (
  { type: LOGOUT }
);

const addToken = (token) => (
  { type: ADD_TOKEN, token }
);

export { login, logout, addToken };
