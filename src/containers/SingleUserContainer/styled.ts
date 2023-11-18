import { styled } from 'styled-components';
import { fontSize } from 'styles/font';

export const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SingleChart = styled.div`
  width: 50%;
  /* height: 430px; */
`;

export const UserActivityHeader = styled.div`
  font-size: ${fontSize[30]};
  text-align: center;
  margin-bottom: 20px;
  margin-top: 40px;
`;
