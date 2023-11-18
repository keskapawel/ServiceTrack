import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { TRegisterRequest, useRegisterMutation } from 'services/auth';
import { useFormik } from 'formik';
import { validationSchema } from './constants';
import { trimEndingSpace } from 'utils/common';
import { useEffect } from 'react';
import { Alert } from 'components/common/Alert';
import { AlertMessages, AlertVariants } from 'components/common/PopupAlert';
import { useDispatch } from 'react-redux';
import { showAlertPopup } from 'reducers/popup-alert-reducer';

export const RegisterContainer = () => {
  const dispatch = useDispatch();
  const [register, { error, isSuccess, isLoading, data }] = useRegisterMutation();
  const navigation = useNavigate();

  const onSubmit = (data: TRegisterRequest) => {
    register({ ...data });
  };

  useEffect(() => {
    if ((isSuccess && data?.statusCode === 200) || data?.statusCode === 201) {
      dispatch(showAlertPopup({ variant: AlertVariants.SUCCESS, message: AlertMessages.ACCOUNT_CREATED }));
      navigation('/login', { replace: true });
    }
    if (error) {
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
    }
  }, [data?.statusCode, dispatch, error, isSuccess, navigation]);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    onSubmit: onSubmit,
    validateOnMount: true,
  });

  const { errors, touched, handleSubmit, isValid, handleBlur, handleChange } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Container component='main' maxWidth='xs'>
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
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  autoComplete='given-name'
                  onChange={handleChange}
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='First Name'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onBlur={handleBlur}
                  error={touched.surname && Boolean(errors.surname)}
                  helperText={touched.surname && errors.surname}
                  onChange={handleChange}
                  required
                  fullWidth
                  id='surname'
                  label='Last Name'
                  name='surname'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(e) => {
                    formik.setFieldValue('email', trimEndingSpace(e.target.value));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  required
                  onChange={handleChange}
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            {data?.statusCode !== 200 && error && <Alert severity='error'>{data?.reason}</Alert>}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={!isValid}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </form>
  );
};
