import { LOGIN, LOGOUT } from '../constants';

const login = (token) => (
  {
    type: LOGIN,
    token,
  }
);

const logout = () => (
  { type: LOGOUT }
);

export { login, logout };
