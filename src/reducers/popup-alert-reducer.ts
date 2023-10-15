import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertMessages } from '../components/common/PopupAlert';
import { AlertVariants } from 'components/common/PopupAlert/constants';

export type TPopupAlertState = {
  variant: AlertVariants;
  message: AlertMessages;
  visible: boolean;
};

const initialState: TPopupAlertState = {
  variant: AlertVariants.SUCCESS,
  message: AlertMessages.SAVED,
  visible: false,
};

const popupAlertSlice = createSlice({
  name: 'alertPopup',
  initialState,
  reducers: {
    showAlertPopup: (state, action: PayloadAction<{ variant: AlertVariants; message: AlertMessages }>) => {
      state.variant = action.payload.variant ?? state.variant;
      state.message = action.payload.message ?? state.message;
      state.visible = true;
    },
    hideAlertPopup: (state) => {
      state.visible = false;
    },
  },
});

export const { showAlertPopup, hideAlertPopup } = popupAlertSlice.actions;
export const popupAlertReducer = popupAlertSlice.reducer;
export default popupAlertReducer;
