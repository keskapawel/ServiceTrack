import styled from 'styled-components';

import { Alert as AlertComponent } from '../Alert/Alert';

import { fontSize, fontWeight } from 'styles/font';
import { palette } from 'styles/palette';

export const Wrapper = styled.div``;

export const AddDocumentWrapper = styled.div``;

export const StyledAlertComponent = styled(AlertComponent)`
  align-items: center;
  background: ${palette.lightGhostWhite};
  color: ${palette.baseColor};
  font-size: ${fontSize[14]};
  font-weight: ${fontWeight.medium};
  margin-top: 25px;
  span,
  div {
    color: ${palette.baseColor} !important;
  }
`;

export const SingleItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 25px;
`;

export const Row = styled.div``;

export const DocumentFileRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  div:nth-child(2) {
    flex: inherit;
    label {
      margin-bottom: 0 !important;
    }
  }
`;

export const FlexRow = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
