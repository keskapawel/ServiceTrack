import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Box } from '@mui/material';
import { Header } from './Header';
import { NavigationBar } from './NavigationBar/NavigationBar';

interface IProps {
  hideNavigation?: boolean;
}

export const Layout = ({ hideNavigation }: IProps) => {
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
          <Outlet />
        </Header>
        <Footer />
      </Box>
    </>
  );
};
