import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// import {
//   useUserProfileAttachmentsQuery,
//   useOIAttachmentsQuery,
//   useShipmentsAttachmentsQuery,
//   useGetVendorAttachmentsQuery,
//   useGetCourierAttachmentsQuery,
// } from 'services/attachments';
// import { usePOAttachmentsQuery } from 'services/attachments';
// import { EPageType, useLocationSelector } from 'reducers/location-reducer';
// import { EModel } from 'models/ModelType';

import { Table } from 'components/common/Table/Table';
import { Icon } from 'components/common/Icon';

// import { columns, DocumentsPageType } from './constants';
import * as S from './styled';
import { columns } from './constants';
import { IUploadFileResponse } from 'models/File';
import { useRemoveFileMutation } from 'services/files';
import { EOption } from 'reducers/location-reducer';
import { setSelectedButton } from 'reducers/navigationButtons-reducer';
import { showAlertPopup } from 'reducers/popup-alert-reducer';
import { AlertVariants, AlertMessages } from '../PopupAlert';
import { useDispatch } from 'react-redux';

interface IProps {
  isVisible: boolean;
  toggleDocumentModal();
  getSelectedDocumentId(id: string, item: IUploadFileResponse);
  orderItemId?: string;
  userId?: string;
  data?: IUploadFileResponse[];
}

export const DocumentsList = ({ isVisible, toggleDocumentModal, getSelectedDocumentId, data, orderItemId = '', userId }: IProps) => {
  const [removeFile, { isSuccess: isRemoveSuccess, isError: isRemoveError }] = useRemoveFileMutation();
  const dispatch = useDispatch();
  const openEditModal = useCallback(
    (id: string, item: IUploadFileResponse) => {
      toggleDocumentModal();
      getSelectedDocumentId(id, item);
    },
    [getSelectedDocumentId, toggleDocumentModal],
  );

  const removeItem = (_: string, data: IUploadFileResponse) => {
    removeFile({ id: data.uuid });
  };

  useEffect(() => {
    if (isRemoveSuccess) {
      dispatch(showAlertPopup({ variant: AlertVariants.SUCCESS, message: AlertMessages.ATTACHMENT_REMOVED }));
    }
    if (isRemoveError) {
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
    }
  }, [dispatch, isRemoveError, isRemoveSuccess]);

  return (
    <S.Wrapper $isVisible={isVisible}>
      <S.TableWrapper $isVisible={isVisible}>
        <Table
          columns={columns}
          menuOptions={[
            { clickHandler: openEditModal, label: 'Edit Item', icon: <Icon icon='PencilIcon' /> },
            { clickHandler: removeItem, label: 'Remove Item', icon: <Icon icon='TrashIcon' /> },
          ]}
          data={data ?? []}
          itemIdAccessor={'uuid'}
          menuOpenerButtonVariant='text'
        />
      </S.TableWrapper>
    </S.Wrapper>
  );
};
