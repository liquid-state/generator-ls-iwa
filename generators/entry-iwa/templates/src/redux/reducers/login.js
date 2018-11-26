import {
  LOGIN_FAILED,
  LOGIN_SUBMITTED,
} from '../actions/authentication';
import {
  SESSION_ESTABLISHED,
} from '../actions/session';

const initialState = {
  inProgress: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUBMITTED:
      return { ...state, inProgress: true, error: null };
    case SESSION_ESTABLISHED:
      return { ...state, inProgress: false, error: null };
    case LOGIN_FAILED:
      return { ...state, inProgress: false, error: 'The login details you entered are incorrect.' };
    default:
      return state;
  }
};
