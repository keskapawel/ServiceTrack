import { memo } from 'react';
import { Divider, Skeleton, TableCell, TableRow } from '@mui/material';

export type TableSkeletonProps = {
  rows: number;
  rowContentHeight?: string | number;
};

const Component = ({ rows, rowContentHeight = '1.625rem' }: TableSkeletonProps) => (
  <>
    {[...Array(rows)].map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton height={rowContentHeight} width='100%' />
          <Divider />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export const TableSkeleton = memo(Component);
