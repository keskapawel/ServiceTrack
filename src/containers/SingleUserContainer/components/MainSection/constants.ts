import { ISingleUserForm } from 'models/User';
import { emailValidator } from 'utils/validators';
import * as yup from 'yup';

export const validationSchema = yup.object({
  userName: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  email: emailValidator,
  isEnabled: yup.boolean().required('Required field'),
  rules: yup
    .array()
    .compact((v) => !v.key)
    .min(1, 'At least one role is required')
    .required('At least one role is required'),
  isExpired: yup.boolean().required('Required field'),
});

export const initialFormValues: ISingleUserForm = {
  id: '',
  userName: '',
  name: null,
  surname: '',
  email: '',
  lastLoginDateTime: null,
  credentialExpireDate: null,
  accountExpireDate: null,
  isEnabled: true,
  isExpired: false,
  isCredentialExpired: false,
  password: '',
  rules: undefined,
  creationDate: '',
  lastModified: '',
};

export const requiredFields: Record<string, boolean> = {
  name: true,
  surname: true,
  email: true,
  isEnabled: true,
  rules: true,
};
