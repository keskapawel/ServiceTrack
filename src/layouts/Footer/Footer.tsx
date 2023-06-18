import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 1,
        px: 1,
        mt: 'auto',
        backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]),
        textAlign: 'center',
      }}
    >
      <Container maxWidth='sm'>
        {/* <Typography variant='body1'>My sticky footer can be found here.</Typography> */}
        <Copyright />
      </Container>
    </Box>
  );
};
