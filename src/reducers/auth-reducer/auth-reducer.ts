import { createSlice } from '@reduxjs/toolkit';

import { useAppSelector } from '../../hooks/store-hook';
import { authApi } from '../../services/auth';
import { setToken, deleteToken } from './actions';

export const AUTH_BASE_STATES = {};

type TAuthSliceState = {
  currentAuthBaseState: null;
  token: string | null;
  isAuthorized: boolean;
  profile: any | null;
};

const initialState: TAuthSliceState = {
  currentAuthBaseState: null,
  token: null,
  isAuthorized: false,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setToken, (state, { payload }) => {
      state.token = payload;
      state.isAuthorized = true;
    });

    builder.addCase(deleteToken, (state) => {
      state.token = null;
      state.isAuthorized = false;
      state.profile = null;
    });

    builder.addMatcher(authApi.endpoints.logIn.matchFulfilled, (state, { payload: { data } }) => {
      state.profile = data;
    });
  },
});

export const authReducer = authSlice.reducer;
export const authReducerReducerName = authSlice.name;
export const useAuthSelector = () => useAppSelector((state) => state[authReducerReducerName]);
// non-null assertion for use inside ProtectedLayout -> there is a safety check
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useUserSelector = (): any => useAuthSelector().profile!;
export default authReducer;
