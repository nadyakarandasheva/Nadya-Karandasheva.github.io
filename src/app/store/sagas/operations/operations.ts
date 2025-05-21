import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOperationDetail } from 'src/interfaces/operation-detail.interface';

interface OperationsState {
  items: IOperationDetail[];
}

const initialState: OperationsState = {
  items: [],
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    setOperations: (state, action: PayloadAction<IOperationDetail[]>) => {
      state.items = action.payload;
    },
    addOperation: (state, action: PayloadAction<IOperationDetail>) => {
      state.items.unshift(action.payload);
    },
    updateOperation: (state, action: PayloadAction<IOperationDetail>) => {
      const index = state.items.findIndex(op => op.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    fetchOperations: () => { },
    saveOperation: (_state, _action: PayloadAction<IOperationDetail>) => { },
  },
},
);

export const operationsActions = operationsSlice.actions;
export const operationsReducer = operationsSlice.reducer;
export const operationsSelectors = {
  all: (state: { operations: OperationsState }) => state.operations.items,
};
