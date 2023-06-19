import { memo } from 'react';
import { UseSortByColumnProps } from 'react-table';

import { palette } from 'styles/palette';
import { Icon } from 'components/common/Icon';

import { StyledSortingArrow, Wrapper } from './styled';

export type Props = Pick<UseSortByColumnProps<object>, 'isSorted' | 'isSortedDesc' | 'canSort'>;

export const Component = ({ canSort, isSorted, isSortedDesc }: Props): JSX.Element => {
  if (!canSort) return <></>;

  if (!isSorted)
    return (
      <Wrapper isSortedDesc={!!isSortedDesc}>
        <Icon icon='SelectorIcon' color={palette.lockedTextAndPlaceholder} />
      </Wrapper>
    );

  return (
    <Wrapper isSortedDesc={!!isSortedDesc}>
      <StyledSortingArrow />
    </Wrapper>
  );
};

export const HeaderSortingArrow = memo(Component);
