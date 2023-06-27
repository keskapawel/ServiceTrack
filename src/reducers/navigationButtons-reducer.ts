import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from 'hooks/store-hook';

export type TNavigationButtonsState = {
  selectedButton: string;
  isValid: boolean;
};

const initialState: TNavigationButtonsState = {
  selectedButton: '',
  isValid: false,
};

const nagivationButtonsSlice = createSlice({
  name: 'nagivationButtons',
  initialState,
  reducers: {
    setSelectedButton: (state, action: PayloadAction<{ selectedButton: string }>) => {
      state.selectedButton = action.payload.selectedButton;
    },
    clearSelection: (state) => {
      state.selectedButton = '';
    },
    setIsValid: (state, action: PayloadAction<{ isValid: boolean }>) => {
      state.isValid = action.payload.isValid;
    },
  },
});

export const { setSelectedButton, clearSelection, setIsValid } = nagivationButtonsSlice.actions;
export const navigationButtonsReducer = nagivationButtonsSlice.reducer;
export const useNavigationButtonsSelector = () => useAppSelector((state) => state.navigationButtons);
export default navigationButtonsReducer;
