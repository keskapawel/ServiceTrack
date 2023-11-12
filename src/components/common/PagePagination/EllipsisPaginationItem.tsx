/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeEvent, memo, useMemo } from 'react';

import { range } from 'utils/common';

import { PaginationItemProps } from './types';
import { EllipsisSelect, StyledButton } from './styled';

const Component = ({ items, index, ...props }: PaginationItemProps) => {
  const previousPage = items[index - 1].page!;
  const nextPage = items[index + 1].page!;
  const { onPageChange, currentPage } = props;

  const pages = useMemo(() => range(previousPage + 1, nextPage - 1), [previousPage, nextPage]);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPageChange(parseInt(event.target.value));
  };

  return (
    <StyledButton>
      <EllipsisSelect value={currentPage} onChange={onChange}>
        {currentPage < previousPage && (
          <option key={`select-page-${currentPage}`} value={currentPage}>
            {currentPage}
          </option>
        )}

        {pages.map((page) => {
          return (
            <option key={`select-page-${page}`} value={page}>
              {page}
            </option>
          );
        })}

        {currentPage > nextPage && (
          <option key={`select-page-${currentPage}`} value={currentPage}>
            {currentPage}
          </option>
        )}
      </EllipsisSelect>
    </StyledButton>
  );
};
Component.displayName = 'EllipsisPaginationItem';

export const EllipsisPaginationItem = memo(Component) as typeof Component;
