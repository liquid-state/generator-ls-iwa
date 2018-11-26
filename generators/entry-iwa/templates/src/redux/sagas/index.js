import { put, spawn } from 'redux-saga/effects';
import { initialisation } from '@project/common';
import session from './session';
import registration from './registration';
import login from './login';
import passwordReset from './password-reset';

export default function* () {
  yield initialisation.saga();
  yield spawn(session);
  yield spawn(login);
  yield spawn(registration);
  yield spawn(passwordReset);
  yield put(initialisation.initialise());
}
