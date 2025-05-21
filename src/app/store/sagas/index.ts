import { all } from 'redux-saga/effects';
import { tokenSaga } from './token';
import { initializerSaga } from './initializer';
import { operationsSaga } from './operations';

export default function* rootSaga() {
  yield all([tokenSaga(), initializerSaga(), operationsSaga()]);
}
