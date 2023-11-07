import styled, { css } from 'styled-components';
import { Autocomplete, InputAdornment, Popper } from '@mui/material';
import { palette } from 'styles/palette';

export const StyledPopper = styled(Popper).attrs((props) => ({
  ...props,
  modifiers: [
    {
      name: 'preventOverflow',
      options: {
        padding: 24,
        altAxis: true,
      },
    },
  ],
}))`
  & {
    .MuiAutocomplete-root {
      border-radius: 8px;
    }

    .MuiAutocomplete-paper {
      box-shadow: none;
      border: 1px solid ${palette.outline};
    }

    .MuiAutocomplete-option {
      border-radius: 8px;
      padding: 8px 12px;
      margin: 12px 12px 0 12px;
    }

    .MuiAutocomplete-listbox {
      padding-bottom: 12px;
      padding-top: 0px;
    }
  }
`;

export const StyledAutocomplete = styled(Autocomplete)<{ $isNaShown?: boolean; $hideSelect?: boolean }>`
  .MuiFormControl-root {
    ${({ $hideSelect }) =>
      $hideSelect &&
      css`
        /* display: none !important; */
        opacity: 0.4;
      `}
  }
  & {
    .MuiFormControl-root,
    .MuiInputBase-formControl {
      padding-top: unset !important;
      padding-bottom: unset !important;
      > div.MuiAutocomplete-endAdornment {
        right: 19px !important;
      }
      .Mui-disabled {
        color: ${palette.baseColor};
        opacity: 100%;
        .MuiChip-deleteIcon {
          display: none;
        }
      }
    }
    .MuiInputBase-input {
      ${({ $isNaShown }) =>
        $isNaShown &&
        css`
          &,
          &::placeholder {
            color: ${palette.lockedTextAndPlaceholder} !important;
            -webkit-text-fill-color: ${palette.lockedTextAndPlaceholder} !important;
          }
        `}
    }
  }
` as typeof Autocomplete;

export const StyledAdornment = styled(InputAdornment)`
  position: absolute;
  right: 16px;
`;
