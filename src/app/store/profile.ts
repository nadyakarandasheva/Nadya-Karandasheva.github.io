import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { Profile } from 'src/server.types';
import { RootState } from './index';

export type ProfileWithRole = Profile & {
  role?: 'admin' | 'user';
};

export const profileSlice = createSlice<ProfileWithRole | null, {
  set: CaseReducer<ProfileWithRole | null, PayloadAction<ProfileWithRole>>,
  clear: CaseReducer<ProfileWithRole | null>
}, 'profile'>({
  name: 'profile',
  initialState: null,
  reducers: {
    set: (_, action) => action.payload,
    clear: () => null,
  },
});

export const profileActions = profileSlice.actions;

export const profileSelectors = {
  get: (state: RootState): RootState['profile'] => state.profile,
  isAdmin: (state: RootState) => state.profile?.role === 'admin',
};

export const profile = profileSlice.reducer;
