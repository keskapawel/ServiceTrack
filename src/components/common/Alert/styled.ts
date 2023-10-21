import { Alert as MuiAlert } from '@mui/material';
import styled from 'styled-components';

export const StyledAlert = styled(MuiAlert)`
  &.MuiAlert {
    &-root {
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.25rem;
      display: flex;
      align-items: center;

      .MuiAlert-icon {
        align-items: center;
      }
    }

    &-standard,
    &-outlined {
    }
  }
`;
