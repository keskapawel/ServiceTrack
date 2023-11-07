import { useEffect, useState } from 'react';

import { showAlertPopup } from 'reducers/popup-alert-reducer';

import { DocumentsList } from 'components/common/DocumentsList/DocumentsList';

import { Icon } from 'components/common/Icon';
import { DocumentModal } from 'components/common/Document/DocumentModal';
import { Button } from 'components/common/Button';
import { AlertVariants, AlertMessages } from 'components/common/PopupAlert';

import * as S from './styled';
import { ISingleTicket } from 'models/Ticket';
import { useGetFileQuery, useUploadFileMutation, useUploadFileToNewResourceMutation } from 'services/files';
import { IUploadFileResponse } from 'models/File';
import { useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query';

interface IProps {
  createNew?: boolean;
  getDocumentData(data);
  id: string;
  editMode?: boolean;
  ticketData?: ISingleTicket;
}

export const SingleTicketDocumentContainer = ({ id, getDocumentData, createNew, editMode, ticketData }: IProps) => {
  const [uploadFile, { isSuccess: isUploadSuccess, isError: isUploadError, data: uploadFileData }] = useUploadFileMutation();
  const [uploadFileToNewResource, { isSuccess: isUploadNewSuccess, isError: isUploadNewError, data: uploadNewFileData }] =
    useUploadFileToNewResourceMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<IUploadFileResponse | undefined>(undefined);
  const [recentlyUpdatedList, setRecentlyUpdatedList] = useState<IUploadFileResponse[]>([]);
  const { data } = useGetFileQuery(selectedAttachment ? { id: selectedAttachment.objectId, fileName: selectedAttachment.name ?? '' } : skipToken);

  const dispatch = useDispatch();

  const toggleDocumentModal = () => {
    setModalOpen((prev) => !prev);
  };

  const hideDocumentModal = () => {
    setModalOpen(false);
  };

  const getSelectedDocumentId = (id: string, file: IUploadFileResponse) => {
    setSelectedAttachment(file);
  };

  useEffect(() => {
    !modalOpen && setSelectedAttachment(undefined);
  }, [modalOpen]);

  const handleSubmit = (submitData) => {
    const { file, description } = submitData;
    if (!id) {
      uploadFileToNewResource({ file, description }).then((data: any) => {
        setRecentlyUpdatedList((prev) => [...prev, data.data.data.file]);
        getDocumentData(data.data.data.file);
        hideDocumentModal();
      });
    } else {
      uploadFile({ id, file, description }).then(() => {
        hideDocumentModal();
      });
    }
  };

  useEffect(() => {
    if (isUploadSuccess || isUploadNewSuccess) {
      dispatch(
        showAlertPopup({
          variant: AlertVariants.SUCCESS,
          message: AlertMessages.ATTACHMENT_UPLOADED,
        }),
      );
      hideDocumentModal();
    }

    if (isUploadError || isUploadNewError) {
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
    }
  }, [dispatch, isUploadSuccess, isUploadNewSuccess, isUploadError, isUploadNewError]);

  return (
    <S.Wrapper>
      <DocumentsList
        isVisible
        toggleDocumentModal={toggleDocumentModal}
        getSelectedDocumentId={getSelectedDocumentId}
        data={ticketData?.files || recentlyUpdatedList}
      />
      <S.NewDocumentWrapper $isVisible>
        <Button
          variant={'text'}
          color={'secondary'}
          disabled={editMode}
          onClick={toggleDocumentModal}
          startIcon={<Icon icon={'DocumentAddIcon'} outline />}
        >
          Add new document
        </Button>
        <DocumentModal
          selectedAttachment={selectedAttachment}
          isOpen={modalOpen}
          hideDocumentModal={hideDocumentModal}
          handleFormSubmit={handleSubmit}
          subTitle={``}
          note={`Remember to add only important files`}
          isUploading={false}
          initialData={selectedAttachment}
        />
      </S.NewDocumentWrapper>
    </S.Wrapper>
  );
};
