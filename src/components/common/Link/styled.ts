import styled from 'styled-components';
import LinkMui from '@mui/material/Link';
import { palette } from 'styles/palette';

export const StyledLink = styled(LinkMui)`
  &.MuiLink-root:not(.MuiButton-root) {
    cursor: pointer;
    transition: 0.3s;

    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-color: transparent;

    &:hover {
      color: ${palette.dark};
      font-weight: 600;
    }

    Icon,
    Icon:before {
      display: inline-block;
      text-decoration: none !important;
    }
  }
`;
