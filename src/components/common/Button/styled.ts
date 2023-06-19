import styled, { css } from 'styled-components';
import { IconButton } from '@mui/material';
import MuiButton from '@mui/lab/LoadingButton';

import { palette } from 'styles/palette';

import type { ButtonType } from './Button';

export const StyledIconButton = styled(IconButton)<{ $hoverColor?: string }>`
  width: auto;
  &:hover {
    &,
    .Icon {
      color: ${({ $hoverColor }) => $hoverColor};
    }

    background: none;
  }
`;

export const StyledButton = styled(MuiButton)<ButtonType>`
  &.MuiButton-root {
    box-sizing: border-box;
    height: 44px;
    padding: 12px 20px;
    line-height: 20px;
    ${(props) =>
      !props.children &&
      `
      .MuiButton-startIcon {
        margin-inline: 0;
      }
      `};
  }
  &.MuiButton-text {
    line-height: 16px;
    background: none;
    &:hover,
    &:active,
    &:focus {
      color: ${palette.dark};
    }
  }
  &.MuiButton-outlined {
    border: 1px solid ${palette.outline};
  }
  &.MuiButton-outlined,
  &.MuiButton-highlighted {
    &:hover {
      background-color: ${palette.outline};
    }
    &:active {
      background-color: ${palette.baseColor};
      color: ${palette.white};
    }
  }
  &.Mui-disabled {
    &:not(.MuiLoadingButton-loading) {
      background-color: ${palette.grayBackFill};
      border: 1px solid ${palette.outline} !important;
    }
  }
  &.MuiButton-contained {
    border: 1px solid ${palette.baseColor};
    &:active {
      background-color: ${palette.baseColor};
    }
  }
  &.MuiButton-highlighted {
    box-sizing: border-box;
    border: 1px solid ${palette.baseColor};
  }

  ${(props) =>
    props.href &&
    props.variant === 'contained' &&
    css`
      color: ${palette.white} !important;
    `};
`;
