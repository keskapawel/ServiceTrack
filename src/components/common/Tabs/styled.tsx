import styled, { css } from 'styled-components';
import { Box, Tab } from '@mui/material';
import { TabList, TabListProps, TabPanel } from '@mui/lab';

import { palette } from 'styles/palette';

type StyledProps = {
  $orientation: TabListProps['orientation'];
  $sticky?: boolean;
};

const TAB_PADDING = '8px';
const TAB_MARGIN = '20px';

export const TabsWrapper = styled(Box)<StyledProps>`
  ${({ $orientation }) =>
    $orientation === 'vertical' &&
    css`
      display: flex;
    `}

  ${({ $sticky }) =>
    $sticky &&
    css`
      background-color: inherit;
    `}
`;

export const StyledTabList = styled(TabList)<StyledProps>`
  min-width: min-content;
  z-index: 1;

  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          border-right: 1px solid ${palette.outline};
          padding-right: 24px;
        `
      : css`
          border-bottom: 1px solid ${palette.outline};
        `}

  ${({ $sticky }) =>
    $sticky &&
    css`
      position: sticky;
      background-color: inherit;
      top: 0;
    `}
`;

export const StyledTab = styled(Tab)<StyledProps>`
  padding: ${TAB_PADDING};
  align-items: flex-start;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  min-height: 0px;
  color: ${palette.baseColor};

  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          &:not(:last-of-type) {
            margin-bottom: ${TAB_MARGIN};
          }
        `
      : css`
          &:not(:last-of-type) {
            margin-right: ${TAB_MARGIN};
          }
        `}

  &.Mui-selected {
    background: none;
    background-color: ${palette.grayBackFill};
    color: ${palette.dark};
  }
`;

export const StyledTabPanel = styled(TabPanel)<StyledProps>`
  width: 100%;

  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          padding-top: ${TAB_PADDING};
        `
      : css`
          padding: 0;
        `};
`;
