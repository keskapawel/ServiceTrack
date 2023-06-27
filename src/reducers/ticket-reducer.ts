import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/store-hook';

import { ITicket } from 'models/Ticket';

export type TTicketState = {
  selectedTicket?: ITicket | null;
};

const initialState: TTicketState = {};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setSelectedTicket: (state, action: PayloadAction<TTicketState>) => {
      state.selectedTicket = action.payload.selectedTicket;
    },
  },
});

export const { setSelectedTicket } = ticketSlice.actions;
export const useTicketSelector = () => useAppSelector((state) => state.ticket);
export const ticketReducer = ticketSlice.reducer;
export default ticketReducer;
