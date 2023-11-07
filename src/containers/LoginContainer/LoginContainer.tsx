import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useLogInMutation } from 'services/auth';
import { useFormik } from 'formik';
import { validationSchema } from './constants';
import { TextInput } from 'components/common/TextInput';
import { trimEndingSpace } from 'utils/common';
import { useEffect } from 'react';
import { Alert } from 'components/common/Alert';

export const LoginContainer = () => {
  const navigation = useNavigate();
  const [logIn, { error, isSuccess, isLoading, data }] = useLogInMutation();

  const onSubmit = (data) => {
    logIn({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (data?.statusCode === 200) {
      navigation('/', { replace: true });
    }
  }, [data?.statusCode, isSuccess, navigation]);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: onSubmit,
    validateOnMount: true,
  });

  const { errors, touched, handleSubmit, isValid, handleBlur, handleChange } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              // type='email'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={(e) => {
                formik.setFieldValue('email', trimEndingSpace(e.target.value));
              }}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */}
            {data?.statusCode !== 200 && isSuccess && <Alert severity='error'>{data?.reason}</Alert>}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={!isValid}>
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid> */}
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </form>
  );
};
