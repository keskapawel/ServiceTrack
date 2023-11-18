import { TChangePasswordRequest } from 'services/auth';
import { strongPasswordValidator } from 'utils/validators';
import * as yup from 'yup';

export const validationSchema = yup.object({
  password: yup.string().required('Required'),
  newPassword: strongPasswordValidator,
  newPasswordConfirmation: strongPasswordValidator.oneOf([yup.ref('newPassword'), ''], 'Passwords does not match!'),
});

export const initialFormValues: TChangePasswordRequest & { showPassword: boolean } = {
  password: '',
  newPassword: '',
  newPasswordConfirmation: '',
  showPassword: false,
};

export const requiredFields: Record<string, boolean> = {
  password: true,
  newPassword: true,
  newPasswordConfirmation: true,
};
