import { ISingleTicket } from 'models/Ticket';
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
