import * as yup from 'yup';

export const emailValidator = yup.string().required('Email is required').email('Enter a valid email');

export const numberValidator = yup.number().typeError('Not a number');

// Allow custom passwords during login without requirements
export const passwordBaseValidator = yup.string().required('Password is required');
