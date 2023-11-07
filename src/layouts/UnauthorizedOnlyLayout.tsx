import { Navigate, Outlet } from 'react-router-dom';

import { useAuthSelector } from 'reducers/auth-reducer';

const UnauthorizedOnlyLayout = () => {
  const { isAuthorized } = useAuthSelector();
  if (isAuthorized) return <Navigate to='/' />;

  return <Outlet />;
};

export default UnauthorizedOnlyLayout;
