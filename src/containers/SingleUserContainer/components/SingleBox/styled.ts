import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ $fullHeight?: boolean }>`
  width: 100%;
  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;
    `}
`;
