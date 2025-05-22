import { call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import { operationsApi } from 'app/client/api/operation-api';
import { operationsActions } from './operations';
import { CategoryFilters, CreateOrUpdateCategoryParams, OperationParams } from 'server.types';

function* fetchOperationsSaga(action: PayloadAction<any>): any {
  try {
    const token = localStorage.getItem('token') || '';
    const response = yield call(operationsApi.fetchOperations, token, action.payload);

    yield put(
      operationsActions.fetchOperationsSuccess({
        data: response.data,
        pagination: response.pagination,
        sorting: response.sorting,
      })
    );
  } catch (error: any) {
    yield put(operationsActions.fetchOperationsFailure(error.message));
  }
}

function* fetchOperationByIdSaga(action: PayloadAction<string>): any {
  try {
    const token = localStorage.getItem('token') || '';
    const response = yield call(operationsApi.fetchOperationById, token, action.payload);
    yield put(operationsActions.fetchOperationByIdSuccess(response));
  } catch (error: any) {
    yield put(operationsActions.fetchOperationByIdFailure(error.message));
  }
}

function* updateOperationSaga(action: PayloadAction<{ id: string; data: any }>): any {
  try {
    const token = localStorage.getItem('token') || '';
    const response = yield call(operationsApi.updateOperation, token, action.payload.id, action.payload.data);
    yield put(operationsActions.updateOperationSuccess(response));
  } catch (error: any) {
    yield put(operationsActions.updateOperationFailure(error.message));
  }
}

function* createOperationSaga(action: ReturnType<typeof operationsActions.createOperation>) {
  try {
    const token = localStorage.getItem('token') || '';
    const result: OperationParams = yield call(operationsApi.createOperation, token, action.payload);
    yield put(operationsActions.createOperationSuccess(result));
  } catch (error: any) {
    yield put(operationsActions.createOperationFailure(error.message));
  }
}

function* fetchCategoriesSaga(action: PayloadAction<CategoryFilters | undefined>): any {
  try {
    const token = localStorage.getItem('token') || '';
    const response = yield call(operationsApi.fetchCategories, token);
    yield put(operationsActions.fetchCategoriesSuccess(response.data));
  } catch (error: any) {
    yield put(operationsActions.fetchCategoriesFailure(error.message));
  }
}

function* createCategorySaga(action: ReturnType<typeof operationsActions.createCategory>): any {
  try {
    const token = localStorage.getItem('token') || '';
    const createdCategory = yield call(operationsApi.createCategory, token, action.payload as CreateOrUpdateCategoryParams);
    yield put(operationsActions.createCategorySuccess(createdCategory));
  } catch (error: any) {
    yield put(operationsActions.createCategoryFailure(error.message));
  }
}

function* updateCategorySaga(action: PayloadAction<{ id: string; name: string }>): any {
  try {
    const token = localStorage.getItem('token') || '';
    const response = yield call(operationsApi.updateCategory, token, action.payload.id, action.payload);
    yield put(operationsActions.updateCategorySuccess(response));
  } catch (error: any) {
    yield put(operationsActions.updateCategoryFailure(error.message));
  }
}

export function* operationsSaga() {
  yield takeLatest(operationsActions.fetchOperations.type, fetchOperationsSaga);
  yield takeLatest(operationsActions.fetchOperationById.type, fetchOperationByIdSaga);
  yield takeLatest(operationsActions.updateOperation.type, updateOperationSaga);
  yield takeLatest(operationsActions.createOperation.type, createOperationSaga);
  yield takeLatest(operationsActions.fetchCategories.type, fetchCategoriesSaga);
  yield takeLatest(operationsActions.createCategory.type, createCategorySaga);
  yield takeLatest(operationsActions.updateCategory.type, updateCategorySaga);
}
