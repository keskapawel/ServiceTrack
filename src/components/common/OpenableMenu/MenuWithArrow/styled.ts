import styled from 'styled-components';
import { Popper, PopperPlacementType } from '@mui/material';

import { SearchInput } from 'components/common/TextInput';

import { palette } from 'styles/palette';

const width = 1;
const height = width / Math.sqrt(2);

export const Arrow = styled.span.attrs<{ placement: PopperPlacementType }>((props) => ({
  placement: props.placement || 'bottom',
}))<{ placement: PopperPlacementType }>`
  overflow: hidden;
  position: absolute;
  width: ${width}em;
  height: ${height}em;
  box-sizing: border-box;

  ${({ placement }) => {
    switch (placement) {
      case 'top':
      case 'top-start':
        return `
          bottom: 0;
          left: 0;
          margin-bottom: -${height}em;
        `;
      case 'top-end':
        return `
          bottom: 0;
          right: ${width}em !important;
          left: unset !important;
          margin-bottom: -${height}em;
          transform: none !important;
        `;
      case 'bottom':
      case 'bottom-start':
        return `
          top: 0;
          left: 0;
          margin-top: -${height}em;
        `;
      case 'bottom-end':
        return `
          top: 0;
          right: ${width}em;
          left: unset !important;
          margin-top: -${height}em;
          transform: none !important;
        `;
      case 'right':
      case 'right-end':
      case 'right-start':
        return `
          left: 0;
          margin-left: -${height}em;
          height: ${width}em;
          width: ${height}em;
        `;
      case 'left':
      case 'left-end':
      case 'left-start':
        return `
          right: 0;
          margin-right: -${height}em;
          height: ${width}em;
          width: ${height}em;
        `;
      default:
        return `
          bottom: 0;
          left: 0;
          margin-bottom: ${height}em;
        `;
    }
  }}

  &::before {
    content: '';
    margin: auto;
    display: block;
    width: 100%;
    height: 100%;
    background-color: white;
    transform: rotate(45deg);
    border: 1px solid ${palette.outline};

    transform-origin: ${({ placement }) => {
      switch (placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          return '100% 0';
        case 'left':
        case 'left-start':
        case 'left-end':
          return '0 0';
        case 'right':
        case 'right-start':
        case 'right-end':
          return '100% 100%';
        default:
          return '0 100%';
      }
    }};
  }
`;

export const StyledPopper = styled(Popper)`
  z-index: 1600;
  position: relative;

  & > .MuiPaper-root {
    padding: 10px;
    min-width: 184px;
    border: 1px solid ${palette.baseColorHover};
    padding: 12px;
    background-color: ${palette.baseColor};

    .MuiPaper-root {
      color: ${palette.white};
      background-color: ${palette.baseColor};
      box-shadow: none;

      .MuiOutlinedInput-root {
        background: none;
      }

      .MuiFormControl-root {
        margin-bottom: 8px;
      }

      .MuiBox-root {
        max-height: 300px;
        overflow: auto;
        background-color: ${palette.baseColor};
      }

      .MuiOutlinedInput-root {
        > fieldset,
        input {
          background: none;
          color: ${palette.white};
          border-color: ${palette.baseColorHover};
        }
      }
    }
  }

  .MuiMenuItem-root {
    border-radius: 8px;
    height: 42px;
    padding: 8px 12px;

    &:hover {
      background-color: ${palette.baseColorHover};
    }

    &:not(:last-of-type) {
      margin-bottom: 10px;
    }

    & .MuiListItemIcon-root {
      color: ${palette.white};
    }
  }
`;

export const StyledSearchInput = styled(SearchInput)`
  .Icon-XIcon:hover {
    color: ${palette.white};
  }
`;
