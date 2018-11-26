/* eslint-disable no-unused-vars */
import {
  takeEvery,
  getContext,
  call,
  put,
  race,
  take,
} from 'redux-saga/effects';
import {
  LOGIN_RESPONSE_SUCCESS,
  LOGIN_RESPONSE_CHANGE_PASSWORD,
  LOGIN_RESPONSE_MFA_REQUIRED,
} from '@liquid-state/iwa-cognito-identity/dist/const';
import IdentityPlugin from '@liquid-state/iwa-identity';
import { getAuthenticator } from '@liquid-state/iwa-cognito-identity';
import {
  LOGIN_SUBMITTED,
  LOGIN_CHANGE_PASSWORD_SUBMITTED,
  LOGIN_SUCCEEDED,
  loginSucceeded,
  loginFailed,
  loginChangePasswordRequired,
} from '../actions/authentication';
import {
  sessionEstablished,
} from '../actions/session';

export default function* authenticationSaga() {
  yield takeEvery(LOGIN_SUBMITTED, onLoginSubmitted);
  yield takeEvery(LOGIN_SUCCEEDED, establishSessionFromLogin);
}

const continueLoginWithResult = (auth, result) => {
  switch (result.code) {
    case LOGIN_RESPONSE_SUCCESS:
      return put(loginSucceeded(result.identity, result.credentials));
    case LOGIN_RESPONSE_MFA_REQUIRED:
      return put(loginFailed('Requires MFA, Not Implemented Yet'));
    case LOGIN_RESPONSE_CHANGE_PASSWORD:
      return call(changePasswordRequired, auth);
    default:
      return null;
  }
};

export function* onLoginSubmitted({ payload: { username, password } }) {
  const app = yield getContext('app');
  const ip = app.use(IdentityPlugin);
  // Ensure cached credentials are cleared before starting next login.
  yield call(ip.logout.bind(ip));
  const auth = yield call(getAuthenticator, app);
  try {
    const result = yield call(auth.login.bind(auth), { username, password });
    yield continueLoginWithResult(auth, result);
  } catch (e) {
    yield put(loginFailed(e.error));
  }
}

function* changePasswordRequired(auth) {
  const history = yield getContext('history');
  yield call(history.replace, '/login/change-password');
  yield put(loginChangePasswordRequired());

  const { submit, restart } = yield race({
    submit: take(LOGIN_CHANGE_PASSWORD_SUBMITTED),
    restart: take(LOGIN_SUBMITTED),
  });
  if (restart) {
    // The user has restarted the login process, abort this one.
    return;
  }
  const newPassword = submit.payload.password;
  try {
    const result = yield call(auth.completeChangePassword.bind(auth), newPassword);
    yield continueLoginWithResult(auth, result);
  } catch (e) {
    put(loginFailed(e.error));
  }
}

function* establishSessionFromLogin({ payload: { identity, credentials } }) {
  const app = yield getContext('app');
  const idp = app.use(IdentityPlugin);
  const cognito = idp.forService('cognito');
  yield call(cognito.update.bind(cognito), identity, credentials);
  yield call(idp.refreshAll.bind(idp));
  yield put(sessionEstablished());
}
