import styled, { css } from 'styled-components';
import { palette } from 'styles/palette';

export const NewDocumentWrapper = styled.div<{ $isVisible: boolean }>`
  padding: 15px 0;
  visibility: visible;
  opacity: 1;
  height: auto;
  transform: translateX(0);
  transition: visibility 0.2s, opacity 0.2s, height 0.2s, transform 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${palette.lockedTextAndPlaceholder};
  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      visibility: hidden;
      padding: 0;
      opacity: 0;
      height: 0;
    `};
`;

export const Wrapper = styled.div`
  transform: translateY(-5px);
  /* border: 1px solid ${palette.outline}; */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transform: translateY(-5px);
  background: ${palette.white};
`;
