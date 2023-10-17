import { ISingleTicket, ISingleTicketForm } from 'models/Ticket';
import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

export const initialFormValues: ISingleTicketForm = {
  state: {
    key: 'NEW',
    value: 'NEW',
  },
  priority: {
    key: '',
    value: '',
  },
  id: null,
  title: '',
  description: '',
  client: {
    id: '',
    name: '',
  },
  userId: '',
  notes: '',
};

export const requiredFields: Record<string, boolean> = {
  customerName: true,
  title: true,
  description: true,
  priority: true,
  state: true,
};
