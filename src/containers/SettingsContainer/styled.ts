import styled from 'styled-components';
import { fontSize, fontWeight } from 'styles/font';
import { palette } from 'styles/palette';

export const Wrapper = styled.div`
  margin-top: 16px;
`;

export const SingleRow = styled.div`
  margin-top: 24px;
`;

export const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
  justify-content: start;
`;

export const Title = styled.div`
  color: ${palette.baseColor};
  font-size: ${fontSize[14]};
  margin-left: 5px;
  font-weight: ${fontWeight.medium};
`;
