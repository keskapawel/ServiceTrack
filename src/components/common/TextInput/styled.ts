import { TextField } from '@mui/material';
import styled, { css } from 'styled-components';

import { IconButton } from 'components/common/Button';

import { palette } from 'styles/palette';

export const StyledTextField = styled(TextField)<{
  $showCurrency?: boolean;
  $hideLabel?: boolean;
  $horizontalLabel?: boolean;
  $isNaShown?: boolean;
}>`
  &.MuiFormControl-root {
    .MuiInputBase {
      &-input {
        background-color: ${palette.white};
        border-radius: 8px;
        ${({ $isNaShown }) =>
          $isNaShown &&
          css`
            color: ${palette.lockedTextAndPlaceholder};
            -webkit-text-fill-color: ${palette.lockedTextAndPlaceholder};
          `}

        &::-webkit-search-cancel-button {
          display: none; // use custom search solution
        }
      }
      &-multiline {
        padding: 0;
      }
    }

    .Mui-error {
      > fieldset {
        border-color: red !important;
      }
    }

    .Mui-disabled {
      cursor: not-allowed;
      background-color: ${palette.grayBackFill};
    }

    .Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border: 2px solid ${palette.baseColor};
      }
    }

    .MuiInputAdornment-positionEnd {
      transform: translateX(4px);
    }

    .MuiInputLabel-root {
      position: relative;
      top: -14px;
      left: -15px;
      background: none;
    }

    .MuiOutlinedInput {
      &-notchedOutline {
        border-color: ${palette.outline};
      }
      &-input {
        box-sizing: border-box;
        height: 44px;
        padding: ${({ $showCurrency }) => ($showCurrency ? '12px 10px 12px 3px' : '12px 10px')};
      }
    }

    label[data-shrink='false'] + .MuiInputBase-root {
      input::placeholder,
      textarea::placeholder {
        opacity: 0.5 !important;

        ${({ disabled, value }) =>
          disabled &&
          !!value &&
          css`
            opacity: 1 !important;
          `}
      }
    }

    ${({ $horizontalLabel }) =>
      $horizontalLabel &&
      css`
        flex-direction: row;
        align-items: center;

        .MuiInputLabel-root {
          max-width: 25%;
          flex-basis: 25%;
          flex-grow: 0;
          top: -9px;
        }

        .MuiInputBase-root {
          max-width: 75%;
          flex-basis: 75%;
          flex-grow: 0;
        }
      `}

    ${({ $hideLabel }) =>
      $hideLabel &&
      css`
        label {
          position: absolute !important;
          left: -999em !important;
        }
      `}
  }
`;

export const CurrencySign = styled.div`
  transform: translateY(1px);
`;

export const AdornmentButton = styled(IconButton)`
  padding: 0;
`;
