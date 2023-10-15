import { Button } from 'components/common/Button';
import styled from 'styled-components';
import { palette } from 'styles/palette';

export const Wrapper = styled.div`
  width: 97%;
  padding: 0 0 32px 0;
`;

export const SendButton = styled(Button)`
  &.MuiButtonBase-root {
    width: 100%;
    display: flex;
    margin-left: 10px;
  }
`;
