import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Box } from '@mui/material';
import { Header } from './Header';

export const Layout = () => {
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
          <Outlet />
        </Header>
        <Footer />
      </Box>
    </>
  );
};
