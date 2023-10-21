import { styled } from 'styled-components';
import { fontSize } from 'styles/font';

export const Wrapper = styled.div`
  margin: 30px auto 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 80%; */
`;

export const Header = styled.div`
  font-size: ${fontSize[26]};
  margin-bottom: 30px;
  align-self: flex-start;
`;

export const ListWrapper = styled.div`
  width: 97%;
`;
