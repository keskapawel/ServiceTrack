import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/store-hook';

import { IUser } from 'models/User';

export type TUserState = {
  selectedUser?: IUser | null;
  isEditMode?: boolean;
};

const initialState: TUserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<TUserState>) => {
      state.selectedUser = action.payload.selectedUser;
    },
    toggleEditMode: (state, action: PayloadAction<{ editMode: boolean }>) => {
      state.isEditMode = action.payload.editMode;
    },
  },
});

export const { setSelectedUser, toggleEditMode } = userSlice.actions;
export const useUserSelector = () => useAppSelector((state) => state.user);
export const userReducer = userSlice.reducer;
export default userReducer;
