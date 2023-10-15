import { useEffect } from 'react';
import { SnackbarProps } from '@mui/material/Snackbar';

import { useAppDispatch } from 'hooks/store-hook';

import { LindearProgress } from 'components/common/LinearProgress/LinearProgress';
import { Icon } from 'components/common/Icon';
import { IconButton } from 'components/common/Button';

import { AlertMessages } from './AlertMessages';

import { AlertVariants, icons } from './constants';
import { palette } from 'styles/palette';
import * as S from './styled';
import { hideAlertPopup } from 'reducers/popup-alert-reducer';

type IProps = {
  alertMessage: AlertMessages;
  visible: boolean;
  variant: AlertVariants;
};

interface IPopup extends Omit<SnackbarProps, 'message'>, IProps {}

export const PopupAlert = ({ children, alertMessage, visible, variant, ...props }: IPopup) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    visible &&
      setTimeout(() => {
        dispatch(hideAlertPopup());
      }, 2000);
  }, [dispatch, visible]);

  const handleClose = () => {
    dispatch(hideAlertPopup());
  };

  const action = (
    <S.ActionWrapper>
      <IconButton onClick={handleClose} aria-label='Close alert popup'>
        <Icon icon={'XIcon'} color={palette.white} />
      </IconButton>
      <S.ProgressWrapper>
        <LindearProgress />
      </S.ProgressWrapper>
    </S.ActionWrapper>
  );

  const details = (
    <S.DetailsWrapper>
      <>
        {icons[variant]}
        <p>{alertMessage}</p>
      </>
    </S.DetailsWrapper>
  );

  return (
    <div>
      <S.StyledSnackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={visible}
        onClose={handleClose}
        message={details}
        key={'bottom' + 'right'}
        action={action}
        variant={variant}
        {...props}
      >
        {children}
      </S.StyledSnackbar>
    </div>
  );
};
