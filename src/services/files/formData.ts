import { addFileToFormData } from 'services/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IAttachmentFormData {
  file?: any;
  description?: string;
}

export const AttachmentFormData = (data: IAttachmentFormData) => {
  const formData = new FormData();

  addFileToFormData(
    {
      file: data.file,
      description: data.description,
    },
    'file',
    formData,
  );

  return formData;
};
