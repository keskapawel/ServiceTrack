import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/store-hook';

import { ISingleTicket } from 'models/Ticket';

export type TTicketState = {
  selectedTicket?: ISingleTicket;
  isEditMode?: boolean;
};

const initialState: TTicketState = {};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setSelectedTicket: (state, action: PayloadAction<TTicketState>) => {
      state.selectedTicket = action.payload.selectedTicket;
    },
    toggleEditMode: (state, action: PayloadAction<{ editMode: boolean }>) => {
      state.isEditMode = action.payload.editMode;
    },
  },
});

export const { setSelectedTicket, toggleEditMode } = ticketSlice.actions;
export const useTicketSelector = () => useAppSelector((state) => state.ticket);
export const ticketReducer = ticketSlice.reducer;
export default ticketReducer;
