import {
  PASSWORD_RESET_CODE_SUBMITTED,
  PASSWORD_RESET_PASSWORD_SUBMITTED,
  PASSWORD_RESET_CODE_VALID,
  PASSWORD_RESET_COMPLETE,
  PASSWORD_RESET_CODE_INVALID,
  PASSWORD_RESET_PASSWORD_INVALID,
  PASSWORD_RESET_STARTED,
} from '../actions/authentication';

const initialState = {
  loading: false,
  error: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_CODE_SUBMITTED:
    case PASSWORD_RESET_PASSWORD_SUBMITTED:
      return { ...state, loading: true, error: undefined };

    case PASSWORD_RESET_CODE_VALID:
    case PASSWORD_RESET_COMPLETE:
      return { ...state, loading: false, error: undefined };

    case PASSWORD_RESET_CODE_INVALID:
    case PASSWORD_RESET_PASSWORD_INVALID:
      return { ...state, loading: false, error: action.payload.error };

    case PASSWORD_RESET_STARTED:
      return { ...initialState };

    default:
      return state;
  }
};
