import * as yup from 'yup';

import { emailValidator, strongPasswordValidator } from 'utils/validators';

export const validationSchema = yup.object({
  email: emailValidator,
  password: strongPasswordValidator,
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
});
