import styled from 'styled-components';
import { palette } from 'styles/palette';

export const DropZoneWrapper = styled.div`
  width: 100%;
  margin-top: 12px;
  > div {
    border-radius: 8px;
    background: ${palette.white};
    height: 100%;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='7' ry='7' stroke='%23E8EBF0' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
    border-radius: 8px;
  }
`;

export const DropZoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  > div {
    margin-bottom: 15px;
  }
`;
