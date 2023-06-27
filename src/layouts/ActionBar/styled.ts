import styled from 'styled-components';
import { Link } from 'components/common/Link';
import { fontSize } from 'styles/font';
import { palette } from 'styles/palette';

export const Wrapper = styled.div`
  color: ${palette.dark};
  font-size: ${fontSize[26]};
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledLinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  padding: 12px 20px;
  line-height: 20px;
  border-radius: 8px;
  border: 1px solid ${palette.outline};
  .MuiButton-startIcon {
    margin-inline: 0;
  }
  &:hover {
    background-color: ${palette.baseColor};
    color: ${palette.white} !important;
  }
  &:active {
    background-color: ${palette.baseColor};
    color: ${palette.white} !important;
  }
`;
