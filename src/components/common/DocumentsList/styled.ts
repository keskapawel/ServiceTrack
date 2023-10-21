import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ $isVisible: boolean }>`
  visibility: visible;
  opacity: 1;
  height: auto;
  transform: translateX(0);
  transition: visibility 0.2s, opacity 0.2s, height 0.2s, transform 0.2s ease-in-out;
  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      visibility: hidden;
      opacity: 0;
      height: 0;
    `}
`;

export const TableWrapper = styled.div<{ $isVisible: boolean }>`
  ${({ $isVisible }) =>
    $isVisible &&
    css`
      width: auto;
      margin-top: 10px;
    `}

  > div {
    overflow: hidden;
  }
  table {
    thead {
      tr {
        th:first-of-type {
          padding-left: 32px;
        }
      }
    }
    tbody {
      tr {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border-left: none;
        border-right: none;
        td:first-of-type {
          padding-left: 32px;
        }
        td {
          white-space: nowrap;
          border-bottom-left-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
      }
    }
  }
`;
