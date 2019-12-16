import {
  LOGIN, LOGOUT, ADD_TOKEN, CHANGE_EVENT,
} from '../constants';

const login = () => (
  {
    type: LOGIN,
  }
);

const logout = () => (
  { type: LOGOUT }
);

const addToken = token => (
  { type: ADD_TOKEN, token }
);

const changeEvent = event => (
  { type: CHANGE_EVENT, event }
);

export {
  login, logout, addToken, changeEvent,
};
