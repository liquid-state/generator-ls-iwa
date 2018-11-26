export const LOGIN_SUBMITTED = 'LOGIN_SUBMITTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGIN_CHANGE_PASSWORD_REQUIRED = 'LOGIN_CHANGE_PASSWORD_REQUIRED';
export const LOGIN_CHANGE_PASSWORD_SUBMITTED = 'LOGIN_CHANGE_PASSWORD_SUBMITTED';
export const LOGIN_CHANGE_PASSWORD_FAILED = 'LOGIN_CHANGE_PASSWORD_FAILED';

export const PASSWORD_RESET_STARTED = 'PASSWORD_RESET_STARTED';
export const PASSWORD_RESET_CODE_SUBMITTED = 'PASSWORD_RESET_CODE_SUBMITTED';
export const PASSWORD_RESET_CODE_VALID = 'PASSWORD_RESET_CODE_VALID';
export const PASSWORD_RESET_CODE_INVALID = 'PASSWORD_RESET_CODE_INVALID';
export const PASSWORD_RESET_PASSWORD_SUBMITTED = 'PASSWORD_RESET_PASSWORD_SUBMITTED';
export const PASSWORD_RESET_COMPLETE = 'PASSWORD_RESET_COMPLETE';
export const PASSWORD_RESET_PASSWORD_INVALID = 'PASSWORD_RESET_PASSWORD_INVALID';

export const loginSubmitted = ({ username, password }) => ({
  type: LOGIN_SUBMITTED,
  payload: {
    username,
    password,
  },
});

export const loginSucceeded = (identity, credentials) => ({
  type: LOGIN_SUCCEEDED,
  payload: {
    identity,
    credentials,
  },
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: {
    error,
  },
});

export const loginChangePasswordRequired = () => ({
  type: LOGIN_CHANGE_PASSWORD_REQUIRED,
  payload: {},
});

export const loginChangePasswordSubmitted = ({ password }) => ({
  type: LOGIN_CHANGE_PASSWORD_SUBMITTED,
  payload: {
    password,
  },
});

export const loginChangePasswordFailed = error => ({
  type: LOGIN_CHANGE_PASSWORD_FAILED,
  payload: {
    error,
  },
});
// Password Reset

export const passwordResetStarted = ({ email }) => ({
  type: PASSWORD_RESET_STARTED,
  payload: {
    email,
  },
});

export const passwordResetCodeSubmitted = ({ code }) => ({
  type: PASSWORD_RESET_CODE_SUBMITTED,
  payload: {
    code,
  },
});

export const passwordResetCodeValid = () => ({
  type: PASSWORD_RESET_CODE_VALID,
  payload: {},
});

export const passwordResetCodeInvalid = error => ({
  type: PASSWORD_RESET_CODE_INVALID,
  payload: {
    error,
  },
});

export const passwordResetPasswordSubmitted = ({ password }) => ({
  type: PASSWORD_RESET_PASSWORD_SUBMITTED,
  payload: {
    password,
  },
});

export const passwordResetComplete = () => ({
  type: PASSWORD_RESET_COMPLETE,
  payload: {},
});

export const passwordResetPasswordInvalid = error => ({
  type: PASSWORD_RESET_PASSWORD_INVALID,
  payload: {
    error,
  },
});
