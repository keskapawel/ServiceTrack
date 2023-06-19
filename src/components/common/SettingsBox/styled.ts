import styled from 'styled-components';
import { Link } from 'components/common/Link';
import { palette } from 'styles/palette';

export const Wrapper = styled(Link)<{ href: string | undefined }>`
  width: 100%;
  width: 271px;
  height: 158px;
  background-color: ${palette.white};
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${palette.outline};
  border-radius: 6px;
  transition: background 0.2s ease-in-out;
  &:hover {
    cursor: ${({ href }) => (href ? 'pointer' : 'not-allowed')};
    background-color: ${palette.grayBackFill};
  }
`;

export const IconContainer = styled.div`
  width: 100%;
`;
