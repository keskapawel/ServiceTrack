import { useMemo, useState, useCallback, useEffect } from 'react';

import { palette } from 'styles/palette';

import { Icon } from 'components/common/Icon';
import { Typography } from 'components/common/Typography';
import { IconButton } from 'components/common/Button';
import { Tooltip } from 'components/common/Tooltip';

import * as S from './styled';
import { IAttachmentTwo } from 'models/Document';
import { useDownloadFileMutation } from 'services/files';
import { AlertVariants, AlertMessages } from 'components/common/PopupAlert';
import { showAlertPopup } from 'reducers/popup-alert-reducer';
import { useAppDispatch } from 'hooks/store-hook';

interface IProps extends Partial<IAttachmentTwo> {
  simpleAttachmentMode?: boolean;
  showNa?: boolean;
  ticketId: string;
}

export const Attachment = ({ url, simpleAttachmentMode, showNa, name, fileType, ticketId }: IProps) => {
  if (simpleAttachmentMode && url) return <SimpleAttachment url={url} fileType={fileType} ticketId={ticketId} />;
  if (url) return <ComplexAttachment url={url} name={name} fileType={fileType} ticketId={ticketId} />;
  return <Typography showNa={showNa} />;
};

const SimpleAttachment = ({ url, fileType, ticketId }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const fileName = useMemo(() => {
    return url?.split('/').pop();
  }, [url]);

  return (
    <S.Wrapper $isHovered={isHovered} variant={'caption'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <S.IconsWrapper>
        <Icon icon={'DocumentTextIcon'} />
        <Typography trim={4}>{fileType}</Typography>
        <DownloadButton isHovered={isHovered} ticketId={ticketId} name={fileName} />
      </S.IconsWrapper>
    </S.Wrapper>
  );
};

const ComplexAttachment = ({ name, ticketId }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <S.Wrapper $isHovered={isHovered} variant={'caption'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* <Tooltip title={name ?? ''} disableHoverListener={!name} placement='top'> */}
      <S.IconsWrapper>
        <Icon icon={'DocumentTextIcon'} />
        <Typography trim={28}>{name}</Typography>
        <DownloadButton isHovered={isHovered} name={name} ticketId={ticketId} />
      </S.IconsWrapper>
      {/* </Tooltip> */}
    </S.Wrapper>
  );
};

interface IDownloadButtonProps {
  ticketId: string;
  name?: string;
  isHovered: boolean;
}

export const DownloadButton = ({ name, ticketId, isHovered }: IDownloadButtonProps) => {
  const [downloadFile, { isSuccess: isUploadSuccess, isError: isUploadError, data: uploadFileData }] = useDownloadFileMutation();
  const dispatch = useAppDispatch();

  const handleDownload = useCallback(
    (id: string, name?: string) => {
      downloadFile({ id, fileName: name || 'File' });
    },
    [downloadFile],
  );

  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      handleDownload(ticketId, name);
    },
    [handleDownload, name, ticketId],
  );

  useEffect(() => {
    if (isUploadSuccess) {
      dispatch(
        showAlertPopup({
          variant: AlertVariants.SUCCESS,
          message: AlertMessages.ATTACHMENT_DOWNLOADED,
        }),
      );
    }

    if (isUploadError) {
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
    }
  }, [dispatch, isUploadSuccess, isUploadError]);

  return (
    <S.StyledIcon $isHovered={isHovered}>
      <IconButton sx={{ transform: 'translateY(-7px)' }} onClick={handleClick} aria-label='Download attachment'>
        <Icon icon={'DownloadIcon'} color={palette.lockedTextAndPlaceholder} />
      </IconButton>
    </S.StyledIcon>
  );
};
