import { NativeSelect, PaginationItem } from '@mui/material';
import styled, { css } from 'styled-components';

import { palette } from 'styles/palette';

import { Button } from 'components/common/Button';

export const List = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

export const EllipsisSelect = styled(NativeSelect)`
  border: none !important;
  background: none !important;
  width: 32px;
  height: 32px;
  display: flex;
  align-self: flex-start;

  &::after {
    border: none;
  }

  &::before {
    content: '...';
    margin: auto;
    display: flex;
    justify-content: center;
    width: 100%;
    border: none !important;
    background: none !important;
    height: 100%;
  }

  select {
    color: transparent;
    border: none !important;
    background: none !important;
    width: 32px;
    height: 32px;
    padding: 0px !important;
  }

  svg {
    display: none;
  }
`;

export const StyledButton = styled(Button).attrs({ variant: 'outlined' })`
  width: 32px !important;
  min-width: 32px !important;
  height: 32px !important;
  padding: 0px !important;
  background: none !important;
`;

export const StyledPaginationItem = styled(PaginationItem).attrs({
  variant: 'outlined',
  shape: 'rounded',
  color: 'primary',
  size: 'medium',
})<{ selected?: boolean }>`
  border-color: ${palette.outline};

  ${({ selected }) =>
    selected
      ? css`
          background: ${palette.baseColor} !important;
          color: ${palette.white} !important;
        `
      : css`
          background: none !important;

          &:hover {
            background: ${palette.outline} !important;
            color: ${palette.dark} !important;
          }
        `}
` as typeof PaginationItem;
