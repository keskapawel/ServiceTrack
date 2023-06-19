import styled, { css } from 'styled-components';
import { palette } from 'styles/palette';
import { fontSize, fontWeight } from 'styles/font';

export const Wrapper = styled.div<{ $size: number; extended?: boolean }>`
  position: relative;
  z-index: 9;
  border-radius: 100%;
  a,
  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    ${(props) =>
      props.$size &&
      !props.extended &&
      css`
        height: ${`${props.$size}px`};
        width: ${`${props.$size}px`};
      `}
  }
  ${(props) =>
    props.$size &&
    !props.extended &&
    css`
      border: 1px solid ${palette.white};
      height: ${`${props.$size}px`};
      width: ${`${props.$size}px`};
    `}
`;

export const CurrentUserProfilePicture = styled.img<{ $size: number }>`
  border-radius: 100%;
  border: 1px solid ${palette.white};
  ${(props) =>
    props.$size &&
    css`
      height: ${`${props.$size}px`};
      width: ${`${props.$size}px`};
    `}
`;

export const TextWrapper = styled.div<{ $bgColor: string; $size: number }>`
  ${(props) =>
    props.$size &&
    css`
      height: ${`${props.$size}px`};
      width: ${`${props.$size}px`};
    `}
  display: flex;
  justify-content: center;
  border-radius: 100%;
  ${(props) =>
    props.$bgColor &&
    css`
      background: ${props.$bgColor};
    `}
  > div {
    margin: auto 0;
    font-size: ${({ $size }) => ($size > 24 ? fontSize[12] : fontSize[10])};
    color: ${palette.baseColor};
    font-weight: ${fontWeight.medium};
  }
`;

export const Name = styled.div`
  color: ${palette.baseColor};
  font-size: ${fontSize[14]};
  margin: 0 0 0 0.5rem;
  font-weight: ${fontWeight.medium};
  flex: 1;
`;
