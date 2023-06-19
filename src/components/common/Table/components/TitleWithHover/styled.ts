import { Typography } from '@mui/material';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Typography)<{ $isHovered: boolean }>`
  border-radius: 8px;
  padding: 6px;
  transition: 0.2s background ease-in-out;
  position: relative;
  ${({ $isHovered }) =>
    $isHovered &&
    css`
      cursor: pointer;
    `}
`;
