import { CHANGE_EVENT } from '../constants';

const event = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_EVENT:
      return action.event;
    default:
      return state;
  }
};

export default event;
