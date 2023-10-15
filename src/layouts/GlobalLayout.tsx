import { Outlet } from 'react-router-dom';

import Location from './Location';
import { AlertHandler } from 'components/common/PopupAlert';

const GlobalLayout = () => {
  return (
    <>
      <Location />
      <AlertHandler />

      <Outlet />
    </>
  );
};

export default GlobalLayout;
