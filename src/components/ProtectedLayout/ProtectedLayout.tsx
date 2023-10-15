import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch } from 'hooks/store-hook';
import { useAuthSelector } from 'reducers/auth-reducer';
import { resetState } from 'reducers/root-reducer';
import { useProfileQuery } from 'services/auth';
import { api } from 'services';

export const ProtectedLayout = () => {
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAuthSelector();

  // refresh data in reducer on every refresh
  // useProfileQuery(undefined, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(api.util.resetApiState());
      dispatch(resetState());
    }
  }, [dispatch, isAuthorized]);

  // if (!isAuthorized) {
  //   return <Navigate to='/login' />;
  // }

  return <Outlet />;
};
