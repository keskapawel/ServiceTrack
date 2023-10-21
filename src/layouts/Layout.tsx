import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Box } from '@mui/material';
import { Header } from './Header';
import { NavigationBar } from './NavigationBar/NavigationBar';
import { ActionBar } from './ActionBar/ActionBar';
import { ReactNode } from 'react';

interface IProps {
  hideNavigation?: boolean;
  children?: ReactNode;
}

export const Layout = ({ hideNavigation, children }: IProps) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          flexGrow: 1,
        }}
      >
        <Header>
          {!hideNavigation && <NavigationBar />}
          {!hideNavigation && <ActionBar />}
          {children}
          <Outlet />
        </Header>
        <Footer />
      </Box>
    </>
  );
};
