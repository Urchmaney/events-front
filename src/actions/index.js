import {
  LOGIN, LOGOUT, ADD_TOKEN, CHANGE_EVENT, SET_ADMIN
} from '../constants';

const login = () => (
  {
    type: LOGIN,
  }
);

const logout = () => (
  { type: LOGOUT }
);

const setAdmin = () => (
  { type: SET_ADMIN }
);

const addToken = token => (
  { type: ADD_TOKEN, token }
);

const changeEvent = event => (
  { type: CHANGE_EVENT, event }
);

export {
  login, logout, addToken, changeEvent, setAdmin,
};
