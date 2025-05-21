import { put, select, takeEvery } from 'redux-saga/effects';
import { IOperationDetail } from 'src/interfaces/operation-detail.interface';
import { operationsActions, operationsSelectors } from './operations';
import { PayloadAction } from '@reduxjs/toolkit';

/** Мок данных */
const mockOperations: IOperationDetail[] = [
  {
    id: 1,
    title: 'Покупка продуктов',
    amount: 2500,
    category: 'Еда',
    description: 'Супермаркет',
    date: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Интернет',
    amount: 500,
    category: 'Связь',
    description: 'Месячная оплата',
    date: new Date().toISOString(),
  },
];

function* fetchOperationsSaga() {
  yield put(operationsActions.setOperations(mockOperations));
}

function* saveOperationSaga(action: PayloadAction<IOperationDetail>) {
  const operation: IOperationDetail = action.payload;

  const operations: IOperationDetail[] = yield select(operationsSelectors.all);

  const exists = operations.some(op => op.id === operation.id);

  if (exists) {
    yield put(operationsActions.updateOperation(operation));
  } else {
    yield put(operationsActions.addOperation(operation));
  }
}

export function* operationsSaga() {
  yield takeEvery(operationsActions.fetchOperations.type, fetchOperationsSaga);
  yield takeEvery(operationsActions.saveOperation.type, saveOperationSaga);
}