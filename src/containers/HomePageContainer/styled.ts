import { styled } from 'styled-components';
import { fontSize } from 'styles/font';

export const Wrapper = styled.div``;

export const BoxesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
  justify-content: start;
`;

export const TicketListWrapper = styled.div`
  margin-top: 60px;
`;

export const ChartsWrapper = styled.div`
  margin-top: 60px;
  margin-bottom: 30px;
`;

export const TicketListHeader = styled.div`
  font-size: ${fontSize[32]};
  text-align: center;
  margin-bottom: 50px;
`;
