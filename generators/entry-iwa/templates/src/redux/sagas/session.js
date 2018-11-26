import {
  takeEvery,
  getContext,
  call,
  put,
  spawn,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Messages } from '@liquid-state/iwa-core';
import IdentityPlugin from '@liquid-state/iwa-identity';
import KeyValuePlugin, { Key } from '@liquid-state/iwa-keyvalue';
import { initialisation } from '@project/common';
import { SESSION_ESTABLISHED, sessionEstablished } from '../actions/session';

export default function* session() {
  yield takeEvery(SESSION_ESTABLISHED, sessionEstablishmentComplete);
  yield spawn(entry);
}

const createMinimumDelay = (d = 3000) => {
  const startTime = Date.now();
  // eslint-disable func-names
  return function* (action) {
    const endTime = Date.now();
    yield call(delay, d - (endTime - startTime));
    yield action;
  };
};

/** Logic for the application entry
 *
 * Checks the following conditions
 * * Is this user currently logged in, if yes redirect to home.
 * * Has this device ever performed registration, if not show the registration page.
 * * Else show the login page
 */
function* entry() {
  const minDelay = createMinimumDelay();
  yield call(initialisation.waitForInitialisation);
  const app = yield getContext('app');
  const history = yield getContext('history');
  const idp = yield call(app.use.bind(app), IdentityPlugin);
  const cognito = idp.forService('cognito');
  let identity = { isAuthenticated: false };
  try {
    identity = yield call(cognito.getIdentity.bind(cognito));
  } catch (e) {
    // getIdentity throws if the kv is not initialised this should be addressed in core libraries.
  }

  if (identity.isAuthenticated) {
    yield* minDelay(put(sessionEstablished()));
    return;
  }
  const kv = yield call(app.use.bind(app), KeyValuePlugin);
  const hasDoneRegistration = yield call(kv.get.bind(kv), 'app.has-done-registration');
  if (hasDoneRegistration.decodeValue()) {
    yield* minDelay(call(history.replace, '/login'));
  } else {
    const key = new Key('app.has-done-registration', true)
      .addWritePermission('iwa', 'entry')
      .addWritePermission('iwa', 'login');
    yield call(kv.set.bind(kv), key);
    yield* minDelay(call(history.replace, '/registration'));
  }
}

function* sessionEstablishmentComplete() {
  const app = yield getContext('app');
  const router = yield getContext('router');
  const idp = yield call(app.use.bind(app), IdentityPlugin);
  // let native app know we are authenticated
  yield call(idp.refreshAll.bind(idp));
  app.communicator.send(Messages.app.setAuthenticationStatus(true));
  yield call(router.navigate.bind(router), '/', { app: 'home', replace: true });
}
