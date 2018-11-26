import {
  PERSONALISATION_SUBMITTED,
  REGISTRATION_SUBMITTED,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  REGISTRATION_VALIDATION_REQUIRED,
  REGISTRATION_VALIDATION_SUBMITTED,
  REGISTRATION_VALIDATION_FAILED,
  TOU_ACCEPTED,
} from '../actions/registration';

const initialState = {
  submitting: false,
  error: null,
  credentials: {},
  personalisation: {},
  touAccepted: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PERSONALISATION_SUBMITTED:
      return {
        ...state,
        personalisation: {
          ...action.payload,
        },
      };

    case REGISTRATION_SUBMITTED:
      return {
        ...state,
        submitting: true,
        error: null,
        credentials: {
          email: action.payload.email,
          password: action.payload.password,
        },
        touAccepted: true,
      };

    case REGISTRATION_FAILED:
      return {
        ...state,
        submitting: false,
        credentials: null,
        error: action.payload.error,
      };

    case REGISTRATION_VALIDATION_REQUIRED:
      return { ...state, error: null, submitting: false };

    case REGISTRATION_VALIDATION_SUBMITTED:
      return { ...state, submitting: true, error: null };

    case REGISTRATION_VALIDATION_FAILED:
      return { ...state, submitting: false, error: action.payload.error };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case TOU_ACCEPTED:
      return {
        ...state,
        touAccepted: true,
      };

    default:
      return state;
  }
};
