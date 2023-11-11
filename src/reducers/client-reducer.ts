import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/store-hook';
import { ISingleClient } from 'models/Client';
import { clientsApi } from 'services/clients';

export type TClientState = {
  activeClient?: ISingleClient;
};

const initialState: TClientState = {};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setActiveClient: (state, action: PayloadAction<TClientState>) => {
      state.activeClient = action.payload.activeClient;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(clientsApi.endpoints.clients.matchFulfilled, (state, { payload: { data } }) => {
      state.activeClient = data.clients.at(1);
    });
  },
});

export const { setActiveClient } = clientSlice.actions;
export const useClientSelector = () => useAppSelector((state) => state.client);
export const clientReducer = clientSlice.reducer;
export default clientReducer;
