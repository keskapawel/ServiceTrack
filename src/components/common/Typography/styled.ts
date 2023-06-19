import styled, { css } from 'styled-components';
import { Typography as MuiTypography } from '@mui/material';

import { palette } from 'styles/palette';

export const StyledTypography = styled(MuiTypography)<{
  $ellipsis?: number | true;
  $isNaShown?: boolean;
}>`
  ${({ $ellipsis }) =>
    $ellipsis &&
    css`
      // Fallback to 1 line if multi-line is not supported
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      ${$ellipsis !== true &&
      $ellipsis > 1 &&
      css`
        // Supported on Desktop since 2020 and on mobile since 2022 on almost all browsers
        @supports (-webkit-line-clamp: ${$ellipsis}) {
          word-break: break-all;
          white-space: initial;
          display: -webkit-box;
          -webkit-line-clamp: ${$ellipsis};
          -webkit-box-orient: vertical;
        }
      `}
    `}

  ${({ $isNaShown }) =>
    $isNaShown &&
    css`
      color: ${palette.lockedTextAndPlaceholder};
    `}
`;

export const WhiteTypography = styled(StyledTypography).attrs({
  color: 'common.white',
})`` as typeof StyledTypography;

export const SecondaryTypography = styled(StyledTypography).attrs({
  color: 'text.secondary',
})`` as typeof StyledTypography;

export const BoldTypography = styled(StyledTypography).attrs({
  color: 'text.bold',
  fontWeight: 600,
})`` as typeof StyledTypography;
