import { combineReducers } from 'redux';
import loggedIn from './auth';
import token from './token';
import event from './event';

const rootReducer = combineReducers({ loggedIn, token, event });

export default rootReducer;
