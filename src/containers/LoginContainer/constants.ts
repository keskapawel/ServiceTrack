import * as yup from 'yup';

import { emailValidator, passwordBaseValidator } from 'utils/validators';

export const validationSchema = yup.object({
  // email: emailValidator,
  email: yup.string().required(),
  password: passwordBaseValidator,
});
