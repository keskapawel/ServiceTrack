import { ISIngleUser } from 'models/User';
import * as yup from 'yup';

export const validationSchema = yup.object({
  // customerName: yup.string().required('Name is required'),
  // ticketSubject: yup.string().required('Subject is required'),
  // ticketDescription: yup.string().required('Description is required'),
  // ticketNotes: yup.string(),
  // ticketPriority: yup.string().required('Priority status is required') /* TBD */,
  // ticketStatus: yup.string() /* TBD */,
  // ticketAssignedTo: yup.string() /* TBD */,
});

export const initialFormValues: ISIngleUser = {
  id: '',
  username: '',
  name: null,
  surname: '',
  email: '',
  lastLoginDateTime: null,
  credentialExpireDate: null,
  accountExpireDate: null,
  isEnabled: false,
  isExpired: false,
  isCredentialExpired: false,
  password: '',
  rules: [],
  createdAt: '',
  lastModified: '',
};

export const requiredFields: Record<string, boolean> = {
  name: true,
  surname: true,
  email: true,
  isEnabled: true,
  rules: true,
};
