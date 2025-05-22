import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { Profile } from './../../server.types';
import { RootState } from './index';

export const profileSlice = createSlice<
  Profile | null,
  {
    set: CaseReducer<Profile | null, PayloadAction<Profile>>;
    clear: CaseReducer<Profile | null>;
  },
  'profile'
>({
  name: 'profile',
  initialState: null as Profile | null,
  reducers: {
    set: (_, action) => action.payload,
    clear: () => null,
  },
});

export const profileActions = profileSlice.actions;
export const profile = profileSlice.reducer;

export const profileSelectors = {
  get: (state: RootState): RootState['profile'] => state.profile,
};
