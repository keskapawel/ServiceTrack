import { ISingleUserForm } from 'models/User';
import { emailValidator } from 'utils/validators';
import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  email: emailValidator,
  enabled: yup.boolean().required('Required field'),
  rules: yup
    .array()
    .compact((v) => !v.key)
    .min(1, 'At least one role is required')
    .required('At least one role is required'),
  expired: yup.boolean().required('Required field'),
});

export const initialFormValues: ISingleUserForm = {
  uuid: '',
  userName: '',
  name: null,
  surname: '',
  email: '',
  lastLoginDateTime: null,
  credentialExpireDate: null,
  accountExpireDate: null,
  enabled: true,
  expired: false,
  isCredentialExpired: false,
  password: '',
  rules: undefined,
  creationDate: '',
  lastModified: '',
  uploadFileData: null,
  avatar: null,
};

export const requiredFields: Record<string, boolean> = {
  name: true,
  surname: true,
  email: true,
  enabled: true,
  rules: true,
};
