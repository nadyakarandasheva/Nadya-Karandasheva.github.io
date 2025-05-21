import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'src/server.types';

interface AuthState {
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpRequest: (_state, _action: PayloadAction<{ email: string; password: string }>) => { },
    signUpSuccess: (state, action: PayloadAction<{ token: string; profile: Profile }>) => {
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;