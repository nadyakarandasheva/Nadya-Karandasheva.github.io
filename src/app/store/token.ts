import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { RootState } from './index';

export const TOKEN_KEY = 'token';

const savedToken = localStorage.getItem('token');

export const tokenSlice = createSlice({
  name: 'token',
  initialState: savedToken ?? (null as string | null),
  reducers: {
    set: (_, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload);
      return action.payload;
    },
    clear: () => {
      localStorage.removeItem('token');
      return null;
    },
  },
});

export const tokenActions = tokenSlice.actions;
export const token = tokenSlice.reducer;

export const tokenSelectors = {
  get: (state: RootState): RootState['token'] => state.token,
};
