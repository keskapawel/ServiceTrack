import { Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import { palette } from 'styles/palette';

export const Wrapper = styled(Typography)<{ $isHovered: boolean }>`
  border-radius: 8px;
  height: 32px;
  padding: 6px 6px 6px 0;
  ${({ $isHovered }) =>
    $isHovered &&
    css`
      background: ${palette.grayBackFill};
      cursor: pointer;
    `}
`;

export const StyledIcon = styled.span<{ $isHovered: boolean }>`
  visibility: visible;
  opacity: 1;
  transition: 0.2s visibility, 0.2s opacity ease-in-out;
  ${({ $isHovered }) =>
    !$isHovered &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  margin: 0;
  padding: 0;
  width: 100%;
  span {
    flex: 1;
  }
`;
