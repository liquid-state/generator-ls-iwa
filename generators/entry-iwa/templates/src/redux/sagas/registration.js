/* eslint-disable no-console */
import {
  takeLatest,
  getContext,
  select,
  race,
  put,
  call,
  take
} from 'redux-saga/effects';
import { Messages } from '@liquid-state/iwa-core';
import IdentityPlugin from '@liquid-state/iwa-identity';
import UbiquityPlugin from '@liquid-state/ubiquity-client/dist/plugin';
import { message } from 'antd';
import { getAuthenticator } from '@liquid-state/iwa-cognito-identity';
import {
  registrationSuccess,
  registrationValidationFailed,
  registrationValidationRequired,
  registrationFailed,
  PERSONALISATION_SUBMITTED,
  REGISTRATION_SUBMITTED,
  REGISTRATION_VALIDATION_SUBMITTED,
  REGISTRATION_VALIDATION_REQUIRED,
  REGISTRATION_VALIDATION_RESEND,
  TOU_ACCEPTED
} from '../actions/registration';

export default function* registrationSaga() {
  yield takeLatest(REGISTRATION_SUBMITTED, onRegistrationSubmitted);
  yield takeLatest(REGISTRATION_VALIDATION_REQUIRED, onVerificationRequired);
  yield takeLatest(PERSONALISATION_SUBMITTED, onPersonalisationComplete);
  yield takeLatest(TOU_ACCEPTED, onTouAccepted);
}

function* onRegistrationSubmitted(action) {
  const app = yield getContext('app');
  const idp = app.use(IdentityPlugin);
  yield call(idp.logout.bind(idp));
  const authenticator = yield call(getAuthenticator, app);
  yield call(doRegistration, authenticator, action);
  while (true) {
    const { validation, resend } = yield race({
      validation: take(REGISTRATION_VALIDATION_SUBMITTED),
      resend: take(REGISTRATION_VALIDATION_RESEND)
    });
    if (resend) {
      yield call(authenticator.resendRegistrationCode.bind(authenticator));
      yield call(message.info.bind(message), 'A new validation code has been sent.');
      // eslint-disable-next-line no-continue
      continue;
    }
    const success = yield call(doValidation, authenticator, validation);
    if (success) {
      break;
    }
  }

  yield call(finaliseRegistration, app);
  yield put(registrationSuccess());

  yield call(app.communicator.send.bind(app.communicator), Messages.app.reset());
}

function* onVerificationRequired() {
  const history = yield getContext('history');
  yield call(history.replace, '/registration/verification');
}

function* onPersonalisationComplete() {
  const history = yield getContext('history');
  yield call(history.push, '/registration/register');
}

function* onTouAccepted() {
  const history = yield getContext('history');
  yield call(history.goBack);
}

function* doRegistration(authenticator, { payload: { email, password } }) {
  try {
    const registrationDetails = {
      username: email.replace('@', '*'),
      email,
      password
    };

    yield call(authenticator.register.bind(authenticator), registrationDetails);
    yield put(registrationValidationRequired());
  } catch (e) {
    let error = e.message ? e.message : e;

    if (error.code) {
      switch (error.code) {
        case 2:
          error = 'This username is in use or otherwise invalid.';
          break;
        case 100:
          error = 'Your password does not match the password complexity requirements.';
          break;
        default:
          error =
            'Something has gone wrong during registration, you can try again, or contact support if the issue continues.';
          break;
      }
    }
    yield put(registrationFailed(error));
  }
}

function* doValidation(authenticator, { payload: { code } }) {
  try {
    yield call(authenticator.confirmRegistration.bind(authenticator), code);
    return true;
  } catch (e) {
    yield put(
      registrationValidationFailed(
        'Registration validation failed. Please ensure the code you entered is correct.'
      )
    );
  }
  return false;
}

function* doInitialLogin(authenticator, idp) {
  const { credentials } = yield select(state => ({
    credentials: {
      username: state.registration.credentials.email,
      password: state.registration.credentials.password
    }
  }));
  const user = yield call(authenticator.login.bind(authenticator), credentials);
  const cognito = idp.forService('cognito');
  return yield call(cognito.update.bind(cognito), user.identity, user.credentials);
}

function* finaliseRegistration(app) {
  const uisClient = UISClient(app);
  try {
    yield call(uisClient.register);
  } catch (e) {
    console.error('Failed to register with the UIS');
  }
  const ubiquityClient = yield call(app.use, UbiquityPlugin);
  const ubiIDP = app.use(IdentityPlugin).forService('ubiquity');
  const ubiIdentity = yield call(ubiIDP.getIdentity.bind(ubiIDP));
  try {
    yield call(ubiquityClient.register, ubiIdentity.identifiers.get('sub'));
  } catch (e) {
    console.error('Error registering with Ubiquity');
  }

  const profile = yield select(state => state.registration.personalisation);
  yield call(ubiquityClient.setProfile, profile);
}
