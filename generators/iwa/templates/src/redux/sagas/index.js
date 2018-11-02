import { put } from 'redux-saga/effects';
import { initialisation } from '@project/common';

export default function* () {
  yield initialisation.saga();
  // Add your sagas here before the put(initialisation.initialise())
  yield put(initialisation.initialise());
}
