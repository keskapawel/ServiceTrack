import { Link } from 'components/common/Link';
import styled, { css } from 'styled-components';

import { fontSize, fontWeight } from 'styles/font';
import { palette } from 'styles/palette';

export const Wrapper = styled.div`
  color: ${palette.lockedTextAndPlaceholder};
  font-size: ${fontSize[14]};
  margin-bottom: 10px;
`;

export const StyledLink = styled(Link)<{ $preventHover?: boolean }>`
  color: ${palette.baseColor};
  font-size: ${fontSize[14]};
  font-weight: ${fontWeight.medium};
  text-decoration: none;
  ${({ $preventHover }) =>
    $preventHover
      ? css`
          &:hover,
          *:hover {
            cursor: default;
          }
        `
      : css`
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        `}
`;
