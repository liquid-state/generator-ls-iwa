import { take } from 'redux-saga/effects';

export default function* () {
  yield take('NOTHING');
}
