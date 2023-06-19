import styled from 'styled-components';

type IconWrapperProps = {
  $outline: boolean;
  $size: number;
  $color?: string;
};

export const IconWrapper = styled.span<IconWrapperProps>`
  font-size: initial !important;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: ${({ $color }) => $color ?? 'currentColor'};

  svg {
    width: inherit;
    height: inherit;
  }
`;
