import { PaginationRenderItemParams, UsePaginationItem } from '@mui/lab';

export type PaginationItemProps = Omit<PaginationRenderItemParams, 'variant' | 'color' | 'shape' | 'size'> & {
  items: UsePaginationItem[];
  index: number;
  onPageChange: (page: number) => void;
  currentPage: number;
};
