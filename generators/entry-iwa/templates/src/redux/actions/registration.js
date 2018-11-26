export const PERSONALISATION_SUBMITTED = 'PERSONALISATION_SUBMITTED';
export const REGISTRATION_SUBMITTED = 'REGISTRATION_SUBMITTED';
export const REGISTRATION_VALIDATION_REQUIRED = 'REGISTRATION_VALIDATION_REQUIRED';
export const REGISTRATION_VALIDATION_SUBMITTED = 'REGISTRATION_VALIDATION_SUBMITTED';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_VALIDATION_FAILED = 'REGISTRATION_VALIDATION_FAILED';
export const REGISTRATION_VALIDATION_RESEND = 'REGISTRATION_VALIDATION_RESEND';

export const TOU_ACCEPTED = 'TOU_ACCEPTED';

export const personalisationSubmitted = ({ role, usesTdl }) => ({
  type: PERSONALISATION_SUBMITTED,
  payload: {
    role,
    usesTdl,
  },
});

export const registrationSubmitted = ({ email, password }) => ({
  type: REGISTRATION_SUBMITTED,
  payload: {
    email,
    password,
  },
});

export const registrationValidationRequired = () => ({
  type: REGISTRATION_VALIDATION_REQUIRED,
  payload: {},
});

export const registrationFailed = error => ({
  type: REGISTRATION_FAILED,
  payload: {
    error,
  },
});

export const registrationSuccess = () => ({
  type: REGISTRATION_SUCCESS,
  payload: {},
});

export const registrationValidationSubmitted = ({ code }) => ({
  type: REGISTRATION_VALIDATION_SUBMITTED,
  payload: {
    code,
  },
});

export const registrationValidationFailed = error => ({
  type: REGISTRATION_VALIDATION_FAILED,
  payload: {
    error,
  },
});

export const resendRegistrationValidation = () => ({
  type: REGISTRATION_VALIDATION_RESEND,
  payload: {},
});

export const touAccepted = () => ({
  type: TOU_ACCEPTED,
  payload: {},
});
