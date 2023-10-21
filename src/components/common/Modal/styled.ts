import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IconButton } from 'components/common/Button';
import { palette } from 'styles/palette';

export const StyledIconButton = styled(IconButton)``;

type DialogContentProps = {
  $hasPadding: boolean;
};

export const StyledDialog = styled(Dialog)`
  max-width: 750px;
  margin: auto;

  .MuiDialog-container {
    margin: auto;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  padding: 32px 32px 40px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: 0.5rem;
  color: ${palette.dark};
`;

export const StyledDialogContent = styled(DialogContent)<DialogContentProps>`
  padding: 32px;
  padding-bottom: ${({ $hasPadding }) => ($hasPadding ? '56px' : 0)};
  background-color: inherit;
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 32px;
  justify-content: flex-start;
`;

export const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;
