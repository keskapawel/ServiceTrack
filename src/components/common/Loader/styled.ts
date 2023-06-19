import styled, { css } from 'styled-components';
import { CircularProgress } from '@mui/material';

export const StyledCircularProgress = styled(CircularProgress)<{ $type: 'small' | 'big' }>`
  ${({ $type }) =>
    $type === 'big' &&
    css`
      margin: 40px;
    `}
`;
