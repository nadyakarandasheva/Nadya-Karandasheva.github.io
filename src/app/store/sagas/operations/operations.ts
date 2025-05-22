import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CreateOrUpdateCategoryParams, OperationParams } from 'server.types';
import { RootState } from '../..';
import { CreateOperationFormValues } from 'features/forms/OperationForm/types';

interface OperationsState {
  operationId?: OperationParams | null;
  filter: {
    data: OperationParams[];
    loading: boolean;
    error: string | null;
    pagination: { pageSize: number; pageNumber: number; total: number };
    sorting: { type: string; field: string };
  };
  loading: boolean;
  error: string | null;
  categories: Category[];
}

const initialState: OperationsState = {
  operationId: null,
  filter: {
    data: [],
    pagination: { pageSize: 10, pageNumber: 0, total: 0 },
    sorting: { type: 'DESC', field: 'createdAt' },
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
  categories: [],
};

export const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    fetchOperations: (state, _action: PayloadAction<any>) => {
      state.filter.loading = true;
      state.filter.error = null;
    },
    fetchOperationsSuccess: (
      state,
      action: PayloadAction<{
        data: OperationParams[];
        pagination: { pageSize: number; pageNumber: number; total: number };
        sorting: { type: 'ASC' | 'DESC'; field: string };
      }>
    ) => {
      const { data, pagination, sorting } = action.payload;

      if (pagination.pageNumber === 1) {
        state.filter.data = data;
      } else {
        state.filter.data = [...state.filter.data, ...data];
      }

      state.filter.pagination = pagination;
      state.filter.sorting = sorting;
      state.filter.loading = false;
    },
    fetchOperationsFailure: (state, action: PayloadAction<string>) => {
      state.filter.error = action.payload;
      state.filter.loading = false;
    },
    fetchOperationById: (state, _action: PayloadAction<string>) => {
      state.filter.loading = true;
    },
    fetchOperationByIdSuccess: (state, action: PayloadAction<OperationParams>) => {
      state.operationId = action.payload;
      state.filter.loading = false;
    },
    fetchOperationByIdFailure: (state, action: PayloadAction<string>) => {
      state.filter.error = action.payload;
      state.filter.loading = false;
    },
    updateOperation: (state, _action: PayloadAction<{ id: string; data: any }>) => {
      state.filter.loading = true;
    },
    updateOperationSuccess: (state, action: PayloadAction<OperationParams>) => {
      state.operationId = action.payload;
      state.filter.data = state.filter.data.map((op) => (op.name === action.payload.name ? action.payload : op));
      state.filter.loading = false;
    },
    updateOperationFailure: (state, action: PayloadAction<string>) => {
      state.filter.error = action.payload;
      state.filter.loading = false;
    },
    createOperation: (state, action: PayloadAction<CreateOperationFormValues>) => {
      state.loading = true;
      state.error = null;
    },
    createOperationSuccess: (state, action: PayloadAction<OperationParams>) => {
      state.filter.data.push(action.payload);
      state.loading = false;
    },
    createOperationFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    fetchCategories(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createCategory(state, action: PayloadAction<CreateOrUpdateCategoryParams>) {
      state.loading = true;
      state.error = undefined;
    },
    createCategorySuccess(state, action: PayloadAction<Category>) {
      state.loading = false;
      state.categories.push(action.payload);
    },
    createCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    updateCategory(state, _action: PayloadAction<{ id: string; name: string }>) {
      state.filter.loading = true;
    },
    updateCategorySuccess(state, action: PayloadAction<Category>) {
      state.operationId = action.payload;
      state.filter.data = state.filter.data.map((ctg) => (ctg.name === action.payload.name ? action.payload : ctg));
      state.filter.loading = false;
    },
    updateCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const operationsActions = operationsSlice.actions;
export const operationsReducer = operationsSlice.reducer;

export const operationsSelectors = {
  all: (state: RootState) => state.operations.filter.data,
};
