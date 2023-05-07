import { createAction } from '@reduxjs/toolkit';

export const setToken = createAction<string>('auth/setToken');

export const deleteToken = createAction('auth/deleteToken');
