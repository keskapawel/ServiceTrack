import * as yup from 'yup';

export const validationSchema = yup.object({
  customerName: yup.string().required('Name is required'),
  ticketSubject: yup.string().required('Subject is required'),
  ticketDescription: yup.string().required('Description is required'),
  ticketNotes: yup.string(),
  ticketPriority: yup.string().required('Priority status is required') /* TBD */,
  ticketStatus: yup.string() /* TBD */,
  ticketAssignedTo: yup.string() /* TBD */,
});

export const initialFormValues: {
  customerName: string;
  ticketSubject: string;
  ticketDescription: string;
  ticketNotes: string;
  ticketAssignedTo: string;
} = {
  customerName: '',
  ticketSubject: '',
  ticketDescription: '',
  ticketNotes: '',
  ticketAssignedTo: '',
};

export const requiredFields: Record<string, boolean> = {
  customerName: true,
  ticketSubject: true,
  ticketDescription: true,
};
