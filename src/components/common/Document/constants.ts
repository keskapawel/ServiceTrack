import * as yup from 'yup';

export const validationSchema = yup.object({
  documentFileName: yup.string().required('Document upload is required'),
  // description: yup.string().required('Description is required'),
});

export const initialFormValues = {
  description: '',
  documentFileName: '',
  file: undefined,
};

export const addDocumentRequiredFields = {
  file: true,
  description: false,
} as Record<string, boolean>;
