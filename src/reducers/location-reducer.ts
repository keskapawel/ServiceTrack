import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/store-hook';

export enum EMenuItem {
  Dashboard = 'Dashboard',
  Settings = 'Settings',
  NanageUsers = 'Manage Users',
  Tickets = 'Tickets',
}

export enum EOption {
  Settings = 'settings',
  SingleUserHeader = 'SingleUserHeader',
  UserActions = 'UserActions',
  Cancel = 'cancel',
  Save = 'save',
}

export type TLocationState = {
  path: string;
  pathName: string;
  pageType: EPageType;
  locationHeader: string;
  options: string[];
};

export enum EPageType {
  EMPTY = '',
  SETTINGS = 'settings',
  MANAGE_USERS = 'manageUsers',
  TICKETS = 'tickets',
  SINGLE_USER = 'singleUser',
}

const initialState: TLocationState = {
  path: '',
  pathName: '',
  pageType: EPageType.EMPTY,
  locationHeader: '',
  options: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      const {
        pathname,
        id,
        customDetails: { details: customDetails, header: customHeader },
      } = action.payload;

      state.path = pathname;
      state.pathName = state.path.split('/').pop() ?? '';
      state.locationHeader = '';
      state.options = [];

      switch (state.pathName) {
        case EPageType.EMPTY:
          state.pageType = EPageType.EMPTY;
          state.locationHeader = EMenuItem.Dashboard;
          state.options = [EOption.Settings];
          break;

        case EPageType.SETTINGS:
          state.pageType = EPageType.SETTINGS;
          state.locationHeader = EMenuItem.Settings;
          break;

        case EPageType.MANAGE_USERS:
          state.pageType = EPageType.MANAGE_USERS;
          state.locationHeader = EMenuItem.NanageUsers;
          // state.options = [EOption.SearchBar, EOption.Filters, EOption.AddNewUser];
          break;

        case EPageType.TICKETS:
          state.pageType = EPageType.TICKETS;
          state.locationHeader = EMenuItem.Tickets;
          // state.options = [EOption.SearchBar, EOption.Filters, EOption.AddNewUser];
          break;

        case id:
          // * If general type is not enough, specific page type may be implemented
          if (customDetails.pageType === EPageType.SINGLE_USER) {
            state.locationHeader = customHeader;
            state.options = [EOption.SingleUserHeader, EOption.UserActions];
          }
          if (customDetails.pageType === EPageType.TICKETS) {
            state.locationHeader = customHeader;
            // state.options = [EOption.SingleUserHeader, EOption.UserActions];
          }
          break;

        default:
          state.pageType = EPageType.EMPTY;
          state.locationHeader = '';
          state.options = [];
          break;
      }
    },
    clearLocationData: (state) => {
      state.locationHeader = '';
      state.options = [];
    },
  },
});

export const { changeLocation, clearLocationData } = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
export const useLocationSelector = () => useAppSelector((state) => state.location);
export default locationReducer;
