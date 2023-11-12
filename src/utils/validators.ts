import * as yup from 'yup';

export const emailValidator = yup.string().required('Email is required').email('Enter a valid email');

export const numberValidator = yup.number().typeError('Not a number');

// Allow custom passwords during login without requirements
export const passwordBaseValidator = yup.string().required('Password is required');
export const strongPasswordValidator = yup
  .string()
  .required('Password is required')
  .matches(
    // eslint-disable-next-line no-useless-escape
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character',
  );
