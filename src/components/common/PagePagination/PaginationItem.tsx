import { memo } from 'react';

import { EllipsisPaginationItem } from './EllipsisPaginationItem';
import { PaginationItemProps } from './types';
import { StyledPaginationItem } from './styled';

const Component = ({ currentPage, items, onPageChange, ...props }: PaginationItemProps) => {
  const { type } = props;
  switch (type) {
    case 'start-ellipsis':
    case 'end-ellipsis':
      return <EllipsisPaginationItem {...props} currentPage={currentPage} items={items} onPageChange={onPageChange} />;
    default:
      return <StyledPaginationItem {...props} />;
  }
};
Component.displayName = 'PaginationItem';

export const PaginationItem = memo(Component) as typeof Component;
