import { styled } from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  width: 150px;
  height: 180px;
  text-align: center;
  margin: 1%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 20px;
  &:hover {
    cursor: pointer;
  }
  > p:first-child {
    flex: 1;
  }
  > p {
    flex: 3;
  }
`;
