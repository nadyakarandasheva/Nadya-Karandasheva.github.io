import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from 'app/client/api/auth-api';
import { tokenActions } from '../../token';
import { Profile } from 'server.types';
import { profileActions } from '../../profile';

function* handleAuth(action: {
  type: string;
  payload: { email: string; password: string; mode: 'signup' | 'signin' };
}) {
  try {
    const { email, password, mode } = action.payload;
    const token: string = yield call(mode === 'signup' ? authApi.signUp : authApi.signIn, email, password);
    yield put(tokenActions.set(token));
    const profile: Profile = yield call(authApi.getProfile, token);
    yield put(profileActions.set(profile));
  } catch (error: any) {
    alert(error);
  }
}

export function* authSaga() {
  yield takeEvery('auth/signUp', handleAuth);
  yield takeEvery('auth/signIn', handleAuth);
}
