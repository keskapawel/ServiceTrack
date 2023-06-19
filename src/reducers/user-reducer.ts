import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/store-hook';

import { IUser } from 'models/User';

export type TPurchaseOrderState = {
  selectedUser?: IUser | null;
};

const initialState: TPurchaseOrderState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<TPurchaseOrderState>) => {
      state.selectedUser = action.payload.selectedUser;
    },
  },
});

export const { setSelectedUser } = userSlice.actions;
export const useUserSelector = () => useAppSelector((state) => state.user);
export const userReducer = userSlice.reducer;
export default userReducer;
