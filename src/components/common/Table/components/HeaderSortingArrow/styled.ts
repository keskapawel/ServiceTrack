import { Icon } from 'components/common/Icon';
import styled, { css } from 'styled-components';

export const StyledSortingArrow = styled(Icon).attrs({ icon: 'ChevronDownIcon', size: 18 })``;

export const Wrapper = styled.span<{ isSortedDesc: boolean }>`
  margin-left: 4px;
  svg {
    transition: transform 0.3s ease-in-out;
    transform: rotate(180deg) translateY(-5px);
  }
  ${(props) =>
    props.isSortedDesc &&
    css`
      svg {
        transform: rotate(0) translateY(5px);
      }
    `}
`;
