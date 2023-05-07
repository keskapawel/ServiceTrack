import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header>This is header</header>
      <Outlet />
    </>
  );
};
