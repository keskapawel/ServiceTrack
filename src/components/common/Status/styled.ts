import styled from 'styled-components';
import { fontSize, fontWeight } from 'styles/font';

export const Wrapper = styled.div``;

export const Title = styled.div<{ $color: string; $background: string }>`
  color: ${({ $color }) => $color};
  background: ${({ $background }) => $background};
  font-size: ${fontSize[14]};
  font-weight: ${fontWeight.medium};
  width: fit-content;
  max-width: 115px;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const ToolTipBox = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
`;