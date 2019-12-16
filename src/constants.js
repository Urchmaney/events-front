const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ADD_TOKEN = 'ADD TOKEN';
const CHANGE_EVENT = 'CHANGE_EVENT';
const daysInMillSec = 24 * 60 * 60000;
const hoursInMilliSec = 60 * 60000;
const minutesInMilliSec = 60000;
const registerUrl = 'http://localhost:3000/api/v1/register';
const loginUrl = 'http://localhost:3000/api/v1/login';
const allEventUrl = 'http://localhost:3000/api/v1/events/all';
const organizersUrl = id => `http://localhost:3000/api/v1/events/${id}/organizers`;
const commentUrl = id => `http://localhost:3000/api/v1/events/${id}/comments`;

export {
  LOGIN,
  LOGOUT,
  ADD_TOKEN,
  CHANGE_EVENT,
  registerUrl,
  loginUrl,
  allEventUrl,
  daysInMillSec,
  hoursInMilliSec,
  minutesInMilliSec,
  organizersUrl,
  commentUrl,
};
