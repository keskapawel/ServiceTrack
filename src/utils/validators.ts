import * as yup from 'yup';

export const emailValidator = yup.string().required('Email is required').email('Enter a valid email');

export const numberValidator = yup.number().typeError('Not a number');
