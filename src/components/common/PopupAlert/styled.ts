import styled from 'styled-components';

import Snackbar from '@mui/material/Snackbar';
import { palette } from 'styles/palette';
import { fontWeight, fontSize } from 'styles/font';
import { AlertVariants } from './constants';

type PopUpAlertProps = {
  variant: string;
};

const getBackgroundColor = (props: PopUpAlertProps): string => {
  switch (props.variant) {
    case AlertVariants.SUCCESS:
      return palette.greenBackLight;
    case AlertVariants.ERROR:
      return palette.redBackLight;
    case AlertVariants.WARNING:
      return palette.orangeBackLight;
    case AlertVariants.INFO:
      return palette.blueBackLight;
    default:
      return palette.grayBackFill;
  }
};

const getFontColor = (props: any): string => {
  switch (props.variant) {
    case AlertVariants.SUCCESS:
      return palette.green;
    case AlertVariants.ERROR:
      return palette.red;
    case AlertVariants.WARNING:
      return palette.orange;
    case AlertVariants.INFO:
      return palette.blue;
    default:
      return palette.baseColor;
  }
};

export const StyledSnackbar = styled(Snackbar)<PopUpAlertProps>`
  padding: 0px;
  > div {
    position: relative;
    padding: 24px;
    overflow: hidden;
    background-color: ${getBackgroundColor};
    border: 1px solid ${getFontColor};
    /* ::before {
      content: '';
      height: 100%;
      width: 8px;
      position: absolute;
      left: 0;
      border-bottom-left-radius: 8px;
      border-top-left-radius: 8px;
      background-color: ${getFontColor};
      z-index: 9;
    } */
    .MuiSnackbarContent-message {
      padding: 0px;
      > div {
        height: 40px;
      }
    }
    .MuiSnackbarContent-action {
      margin-right: 0px;
    }
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  > span {
    width: 40px;
    height: 40px;
    text-align: center;
    > svg {
      width: 20px;
    }
  }

  > p {
    color: ${getFontColor};
    font-size: ${fontSize[14]};
    font-weight: ${fontWeight.medium};
  }
`;

export const ProgressWrapper = styled.div`
  position: absolute;
  bottom: 1px;
  left: 0;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  .MuiLinearProgress-bar {
    background-color: ${palette.white};
  }
`;

export const ActionWrapper = styled.div`
  span {
    color: ${getFontColor};
    &:hover {
      cursor: pointer;
    }
  }
`;
