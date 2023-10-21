import { useEffect, useCallback } from 'react';
import { useFormik } from 'formik';

import { Modal } from 'components/common/Modal';
import { Document } from './Document';

import { validationSchema, initialFormValues } from './constants';
import { IAttachment } from 'models/Document';
import { IUploadFileResponse } from 'models/File';

interface IProps {
  isOpen: boolean;
  hideDocumentModal: () => void;
  handleFormSubmit(data);
  initialData?: IUploadFileResponse;
  selectedAttachment?: IUploadFileResponse;
  subTitle: string;
  note?: string;
  isUploading: boolean;
}

export const DocumentModal = ({
  isOpen,
  hideDocumentModal,
  handleFormSubmit,
  initialData,
  selectedAttachment,
  subTitle,
  note,
  isUploading,
}: IProps) => {
  const handleClose = useCallback(() => {
    hideDocumentModal();
  }, [hideDocumentModal]);

  const onSubmit = useCallback(
    (data) => {
      handleFormSubmit(data);
    },
    [handleFormSubmit],
  );

  const formik = useFormik({
    validationSchema,
    initialValues: selectedAttachment
      ? {
          description: initialData?.description,
          documentFileName: initialData?.name,
          file: initialData,
        }
      : initialFormValues,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  const { resetForm, isValid, validateForm, handleSubmit, values } = formik;

  useEffect(() => {
    validateForm();
    return () => {
      resetForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    validateForm(); // dirty hack for form validation after uploading file...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.documentFileName]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        icon={'DocumentAddIcon'}
        title={selectedAttachment ? 'Edit document' : 'Upload document'}
        cancelButton
        fullWidth
        actions={[
          {
            type: 'submit',
            disabled: !isValid,
            loading: isUploading,
            children: selectedAttachment ? 'Save' : 'Upload',
          },
        ]}
        onSubmit={handleSubmit}
      >
        <Document formik={formik} subTitle={subTitle} note={note} />
      </Modal>
    </>
  );
};
