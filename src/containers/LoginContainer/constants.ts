import * as yup from 'yup';

import { emailValidator, passwordBaseValidator } from 'utils/validators';

export const validationSchema = yup.object({
  email: emailValidator,
  password: passwordBaseValidator,
});
