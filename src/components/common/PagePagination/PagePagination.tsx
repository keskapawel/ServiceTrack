import { memo, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { usePagination } from '@mui/lab';

import { PaginationItem } from './PaginationItem';
import { List } from './styled';

interface IProps {
  changePage: (value: number) => void;
  page: number;
  pages: number;
  className?: string;
  disabled?: boolean;
}

const Component = ({ changePage, page, pages, className, disabled }: IProps) => {
  const onChange = useCallback(
    (_, newPage: number) => {
      changePage(newPage);
    },
    [changePage],
  );

  const { items } = usePagination({
    count: pages,
    page,
    boundaryCount: 2,
    siblingCount: 1,
    onChange,
  });
  if (pages === 1 || disabled) return <></>;

  return (
    <Stack spacing={2} className={className}>
      <nav>
        <List>
          {items.map((item, index) => (
            <PaginationItem key={index} {...item} currentPage={page} onPageChange={changePage} items={items} index={index} />
          ))}
        </List>
      </nav>
    </Stack>
  );
};
Component.displayName = 'PagePagination';

export const PagePagination = memo(Component) as typeof Component;
