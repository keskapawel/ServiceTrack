import styled, { css } from 'styled-components';
import { Box, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { palette } from 'styles/palette';
import { fontSize, fontWeight } from 'styles/font';

import { Icon } from 'components/common/Icon';
import { Button } from 'components/common/Button';

export const CellWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
`;

export const Wrapper = styled.span<{ isSortedDesc: boolean }>`
  margin-left: 4px;
  svg {
    transition: transform 0.3s ease-in-out;
    transform: rotate(180deg) translateY(-5px);
  }
  ${(props) =>
    props.isSortedDesc &&
    css`
      svg {
        transform: rotate(0) translateY(5px);
      }
    `}
`;

export const MainTableWrapper = styled.div`
  width: auto;
  height: 100%;
  // margin-top: 40px;
`;

export const TableWrapper = styled(Box)<{ $fullHeight?: boolean }>`
  width: 100%;
  height: 100%;

  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;
    `};
`;

export const StyledTableBody = styled(TableBody)<{ $fullHeight?: boolean }>`
  height: 100%;

  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;
    `};
`;

export const StyledSortingArrow = styled(Icon).attrs({ icon: 'ChevronDownIcon', size: 18 })``;

export const StyledTableContainer = styled(TableContainer)<{ $fullHeight?: boolean }>`
  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;

      & .MuiTable-root {
        height: 100%;
      }
    `};

  overflow-y: auto;
  overflow-x: auto;
  max-height: calc(100vh - 155px);
  height: 100%;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    border-radius: 4px;
    background-color: ${palette.scrollbar};
  }

  ::-webkit-scrollbar-thumb:vertical {
    border-radius: 4px;
    background-color: ${palette.scrollbar};
  }
`;

export const StyledTableHeaderCell = styled(TableCell)<{
  $isSorted?: boolean;
  $sticky?: boolean;
  $isWidthInfinite?: boolean;
}>`
  background-color: inherit;
  border-top: none;
  border: none;
  color: ${palette.baseColor};
  font-weight: ${fontWeight.medium};
  ${({ $isWidthInfinite }) =>
    !$isWidthInfinite &&
    css`
      flex: 0 auto !important;
      border-top: 1px solid rgba(224, 224, 224, 1);
      border-bottom: none !important;

      &:last-child {
        flex: 1 1 auto !important;
        max-width: unset;
      }
    `};
  padding: 10px 16px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  font-size: ${fontSize[14]};
  line-height: 200%;
  border-radius: 8px;

  .MuiButtonBase-root {
    border: 1px solid transparent;
  }

  font-size: ${fontSize[14]};
  font-weight: 400;

  .MuiButtonBase-root {
    padding: 0;
    border-radius: 8px;
    font-size: ${fontSize[14]};
    > span > span > svg {
      margin-top: -8px;
    }
  }

  .MuiButtonBase-root:focus {
    background-color: ${palette.baseColor};
    color: ${palette.white};
    border-radius: 8px;
    padding: 5px 12px;
    margin: -12px;
    .Icon-SelectorIcon {
      color: white !important;
    }
  }
  ${({ $isSorted }) =>
    $isSorted &&
    css`
      .MuiButtonBase-root {
        padding: 5px 12px;
        margin: -12px;
        color: ${palette.baseColor};
        border: 1px solid ${palette.baseColor};
      }
    `};

  ${({ $sticky }) =>
    $sticky &&
    css`
      position: sticky !important;
      left: 0 !important;
      background-color: ${palette.grayBackFill} !important;
      z-index: 10;
    `};
`;

export const StyledTableCell = styled(TableCell)<{
  border?: string;
  $fullHeight?: boolean;
  $sticky?: boolean;
  $isWidthInfinite?: boolean;
  $redirectOnClick?: boolean;
}>`
  padding: 20px 16px;
  margin: 0;
  height: ${({ $fullHeight }) => ($fullHeight ? '100%' : '68px')};
  display: flex;
  align-items: center;

  ${({ $redirectOnClick }) =>
    $redirectOnClick &&
    css`
      > .MuiLink-root {
        display: flex;
        align-items: center;

        // fixes cell displacement bug; negative margin with positive padding to cover whole cell as link
        margin: -20px -16px;
        padding: 20px 16px;
        width: calc(100% + 32px);
        height: calc(100% + 40px);
      }
    `}

  ${({ $isWidthInfinite }) =>
    !$isWidthInfinite &&
    css`
      flex: 0 auto !important;

      &:last-child {
        flex: 1 1 auto !important;
        max-width: unset;
      }
    `};
  border: none;

  ${({ border }) =>
    border &&
    css`
      border-${border}: 1px solid ${palette.outline} !important;
  `};

  ${({ $sticky }) =>
    $sticky &&
    css`
      margin-right: 2px;
      position: sticky !important;
      left: 0 !important;
      background-color: inherit !important; // inherit from tr => 2 color rows
      z-index: 10;
      // fixes background overflowing border
      border: 1px solid transparent;
      background-clip: padding-box;
    `};
`;

export const IconCell = styled(StyledTableCell)<{
  $hasChevron?: boolean;
  $hasMenu?: boolean;
  $onlyMenu?: boolean;
  $commentCell?: boolean;
  $hasMultipleActions?: boolean;
}>`
  width: 75px;
  max-width: 75px;
  justify-content: flex-end;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 0;
  margin-right: 0;

  ${({ $hasChevron }) =>
    $hasChevron &&
    css`
      width: 50px !important;
      max-width: 50px !important;
    `};

  ${({ $hasMenu }) =>
    $hasMenu &&
    css`
      width: 80px;
      max-width: 80px;
    `};

  ${({ $commentCell }) =>
    $commentCell &&
    css`
      button {
        border: 1px solid ${palette.baseColor};
        width: 64px;
        height: 44px;
        border-radius: 8px;
        align-self: center;
      }
    `};
`;

export const NormalRow = styled(TableRow)<{
  $expandable: boolean;
  $expanded?: boolean;
  $isHoverActive?: boolean;
  $clickable?: boolean;
}>`
  border: 1px solid ${palette.outline};
  transition: border-radius 0.1s ease-out;
  box-sizing: border-box;

  &:first-of-type {
    border-top: 1px solid ${palette.outline};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:nth-child(even) {
    background-color: ${palette.tableDarkRow};
  }

  &:nth-child(odd) {
    background-color: ${palette.white};
  }
  table {
    ${StyledTableCell} {
      height: 68px !important;
      padding: 20px 16px;
    }
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${palette.blue};
  }

  ${({ $expandable }) =>
    $expandable
      ? css`
          background-color: ${palette.white};
        `
      : css`
          border-top: none;
        `}

  ${({ $isHoverActive }) =>
    $isHoverActive &&
    css`
      :hover {
        cursor: pointer;
      }
    `}

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}

  ${({ $expandable, $expanded }) => {
    if (!$expandable) return undefined;

    return $expanded
      ? css`
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        `
      : css`
          border-radius: 8px;
        `;
  }}
`;

export const ExpandedRow = styled(NormalRow)<{ $expanded: boolean }>`
  background-color: ${palette.white} !important;
  margin-bottom: 8px;
  border-top: none;

  ${StyledTableCell} {
    height: auto !important;
    padding: 0;
  }

  ${({ $expanded }) =>
    $expanded
      ? css`
          border-radius: 0;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        `
      : css`
          border: none !important;

          ${StyledTableCell} {
            transition: padding 0.1s ease-out;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        `}
`;

export const StyledCTAButton = styled(Button)`
  margin-top: 40px !important;
`;

export const NoResultsWrapper = styled.div`
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  > button {
    margin-top: 20px !important;
  }
`;
