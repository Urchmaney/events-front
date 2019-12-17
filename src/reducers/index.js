import { combineReducers } from 'redux';
import loggedIn from './auth';
import token from './token';
import event from './event';
import isAdmin from './admin';

const rootReducer = combineReducers({
  loggedIn, token, event, isAdmin,
});

export default rootReducer;
