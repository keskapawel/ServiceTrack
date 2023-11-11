import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch } from 'hooks/store-hook';
import { useAuthSelector } from 'reducers/auth-reducer';
import { resetState } from 'reducers/root-reducer';
import { useProfileQuery } from 'services/auth';
import { api } from 'services';
import { useClientsQuery } from 'services/clients';
import { useClientSelector } from 'reducers/client-reducer';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Loader } from 'components/common/Loader';

export const ProtectedLayout = () => {
  const dispatch = useAppDispatch();
  const { isAuthorized, profile } = useAuthSelector();
  const { activeClient } = useClientSelector();

  // refresh data in reducer on every refresh
  useProfileQuery(undefined, { refetchOnMountOrArgChange: true });

  useClientsQuery(!activeClient?.uuid ? undefined : skipToken, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(api.util.resetApiState());
      dispatch(resetState());
    }
  }, [dispatch, isAuthorized]);

  if (!isAuthorized) {
    return <Navigate to='/login' />;
  }

  return profile.uuid ? <Outlet /> : <Loader />;
};
