import { combineReducers, createAction } from '@reduxjs/toolkit';

import { api } from '../services';
import { authReducer, authReducerReducerName } from './auth-reducer';
import userReducer from './user-reducer';
import ticketReducer from './ticket-reducer';
import locationReducer from './location-reducer';
import navigationButtonsReducer from './navigationButtons-reducer';
import { popupAlertReducer } from './popup-alert-reducer';
import clientReducer from './client-reducer';
import pageDataReducer, { pageDataReducerName } from './pageData-reducer';

export const resetState = createAction('root/resetState');

const combinedReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [authReducerReducerName]: authReducer,
  [pageDataReducerName]: pageDataReducer,
  user: userReducer,
  ticket: ticketReducer,
  location: locationReducer,
  navigationButtons: navigationButtonsReducer,
  popupAlert: popupAlertReducer,
  client: clientReducer,
});

export const rootReducer: typeof combinedReducer = (state, action) => {
  if (resetState.match(action)) state = undefined;

  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof combinedReducer>;
