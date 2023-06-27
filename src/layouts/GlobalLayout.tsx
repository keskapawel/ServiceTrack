import { Outlet } from 'react-router-dom';

import Location from './Location';

const GlobalLayout = () => {
  return (
    <>
      <Location />
      <Outlet />
    </>
  );
};

export default GlobalLayout;
