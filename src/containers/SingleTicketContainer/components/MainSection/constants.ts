import { ISingleTicket } from 'models/Ticket';
import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

export const initialFormValues: ISingleTicket = {
  id: '',
  title: '',
  description: '',
  client: {
    id: '',
    name: '',
  },
  userId: '',
  state: '',
  priority: '',
  creationDate: '',
  editDate: '',
  notes: '',
};

export const requiredFields: Record<string, boolean> = {
  customerName: true,
  title: true,
  description: true,
};
