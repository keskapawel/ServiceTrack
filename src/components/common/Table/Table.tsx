/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTable, useFlexLayout, useSortBy, useExpanded, TableOptions } from 'react-table';
import MaterialTable from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { TableRow as MuiTableRow } from '@mui/material';

import { TableSkeleton } from './TableSkeleton';
import { TableRow } from './TableRow';
import { NoResults } from './NoResults';

import { TableLoader, TableProps } from './types';
import { isEqual } from 'lodash-es';
import { generateTableLoaderOptions } from './constants';
import * as S from './styled';
import { Link } from '../Link';
import { TableMenuCell } from './TableMenuCell';
import { ColumnsSettings } from './components/ColumnsSettings';
import { mapSortQueryToSortingRule, mapSortingRuleToSortQuery } from './utils';
import { Icon } from '../Icon';
import { HeaderSortingArrow } from './components/HeaderSortingArrow/HeaderSortingArrow';
import OpenableMenu from '../OpenableMenu';
import { Typography } from '../Typography';

export const Table = <ItemType extends object, IdType extends string>({
  columns,
  data,
  menuOptions,
  itemIdAccessor,
  linkConstructor,
  manualSortBy = true,
  initialState,
  enableSortBy = false,
  commentCell = false,
  lastCellBorder = false,
  maxRows,
  redirectOnClick = true,
  initialSortBy,
  isLoading,
  onChangeSort,
  pagination,
  onPageChange,
  onRowClick,
  menuOpenerButtonVariant = 'outlined',
  Expandable,
  menuOpener,
  pageDataKey,
  openableOnRowClick,
}: TableProps<ItemType, IdType>) => {
  const memoizedInitialState: typeof initialState = useMemo(
    () => ({ ...initialState, sortBy: mapSortQueryToSortingRule(initialSortBy) }),
    [initialState, initialSortBy],
  );

  const [newColumns, setNewColumns] = useState<Pick<TableOptions<ItemType>, 'columns'>>(columns);
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
    setSortBy,
  } = useTable(
    {
      columns: newColumns,
      data,
      disableMultiSort: true,
      disableSortRemove: true,
      disableSortBy: !enableSortBy,
      manualSortBy,
      initialState: memoizedInitialState,
      expandSubRows: false,
    },
    useFlexLayout,
    useSortBy,
    useExpanded,
  );

  useEffect(() => {
    if (!isEqual(memoizedInitialState.sortBy, sortBy)) setSortBy(memoizedInitialState.sortBy ?? []);
  }, [memoizedInitialState]);

  useEffect(() => {
    if (onChangeSort && !isEqual(memoizedInitialState.sortBy, sortBy)) {
      onChangeSort(mapSortingRuleToSortQuery(sortBy));
    }
  }, [sortBy]);

  const isExpandable = !!Expandable;

  const { isLoading: shouldDisplaySkeleton, rows: skeletonRows }: Required<TableLoader> = generateTableLoaderOptions(isLoading, { maxRows });

  const displayMenu = Boolean(menuOptions?.length);

  const noResults = !data?.length && !shouldDisplaySkeleton;

  const handleCellClick = useCallback((row) => openableOnRowClick && isExpandable && row.toggleRowExpanded(), []);

  const handleCellWrapperClick = useCallback(
    (event) => openableOnRowClick && isExpandable && event.stopPropagation(), // to avoid a row expanding when a user copies a text
    [],
  );

  const getSortingMenu = (column) => {
    return [
      ...(column.isSorted
        ? [
            {
              clickHandler: () => column.clearSortBy(),
              label: 'Clear Sorting',
              icon: <Icon icon='XIcon' />,
            },
          ]
        : []),
      {
        clickHandler: () => column.toggleSortBy(false),
        label: 'Sort Ascending',
        icon: <Icon icon='SortAscendingIcon' />,
      },
      {
        clickHandler: () => column.toggleSortBy(true),
        label: 'Sort Descending',
        icon: <Icon icon='SortDescendingIcon' />,
      },
    ];
  };

  const getSortingArrow = (column) => {
    return (
      <>
        {column.render('Header')}
        <HeaderSortingArrow canSort={column.canSort} isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} />
      </>
    );
  };

  return (
    <S.MainTableWrapper>
      <S.TableWrapper $fullHeight={noResults}>
        <S.StyledTableContainer $fullHeight={noResults}>
          {data?.length > 0 && <ColumnsSettings columns={newColumns} setNewColumns={setNewColumns} defaultColumns={columns} />}
          <MaterialTable {...getTableProps()} stickyHeader data-cy={`${pageDataKey}-list`}>
            {!noResults && (
              <TableHead>
                {headerGroups.map((headerGroup) => {
                  const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();

                  return (
                    <MuiTableRow key={headerGroupKey} {...headerGroupProps}>
                      {headerGroup.headers.map((column) => {
                        const { key: columnHeaderKey, ...columnHeaderProps } = column.getHeaderProps();
                        const isWidthInfinite = column.maxWidth !== Number.MAX_SAFE_INTEGER;

                        return (
                          <S.StyledTableHeaderCell
                            key={columnHeaderKey}
                            $sticky={column?.sticky}
                            $isSorted={column.isSorted}
                            $isWidthInfinite={isWidthInfinite}
                            {...columnHeaderProps}
                          >
                            {!column.canSort ? (
                              // column.render('Header')
                              <Typography textAlign='center'>{column.render('Header')}</Typography>
                            ) : (
                              <OpenableMenu
                                isIconOpener
                                openerProps={{ children: getSortingArrow(column) }}
                                menuId={'menu' + column.id}
                                childArray={getSortingMenu(column)}
                              />
                            )}
                          </S.StyledTableHeaderCell>
                        );
                      })}

                      {commentCell && <S.IconCell as={S.StyledTableHeaderCell} $hasMenu $onlyMenu={false} $commentCell />}

                      {displayMenu && (
                        <S.IconCell
                          as={S.StyledTableHeaderCell}
                          $hasMenu
                          $hasMultipleActions={commentCell}
                          $onlyMenu={displayMenu && !isExpandable}
                        />
                      )}

                      {isExpandable && <S.IconCell as={S.StyledTableHeaderCell} $hasChevron />}
                    </MuiTableRow>
                  );
                })}
              </TableHead>
            )}

            <S.StyledTableBody $fullHeight={noResults}>
              {shouldDisplaySkeleton ? (
                <TableSkeleton rows={skeletonRows} />
              ) : data?.length > 0 ? (
                rows.map((row) => {
                  prepareRow(row);
                  const { key: rowKey, ...rowProps } = row.getRowProps();
                  return (
                    <TableRow
                      openableOnRowClick={openableOnRowClick && isExpandable}
                      key={rowKey}
                      {...rowProps}
                      onClick={() => onRowClick && onRowClick(row.original)}
                      Expandable={Expandable}
                      row={row}
                      activeHover={onRowClick && true}
                    >
                      {row.cells.map((cell) => {
                        const { key: cellKey, ...cellProps } = cell.getCellProps();
                        const isWidthInfinite = cell.column.maxWidth !== Number.MAX_SAFE_INTEGER;

                        return (
                          <S.StyledTableCell
                            onClick={() => handleCellClick(row)}
                            key={cellKey}
                            {...cellProps}
                            border={cell.column['border']}
                            $sticky={cell.column['sticky']}
                            $isWidthInfinite={isWidthInfinite}
                            $redirectOnClick={cell.column.redirectOnClick}
                          >
                            {cell.column.redirectOnClick ? (
                              <Link
                                href={
                                  linkConstructor
                                    ? `${linkConstructor}/${row.original[itemIdAccessor]}`
                                    : (row.original[itemIdAccessor] as unknown as IdType)
                                }
                                target='_self'
                                rel='noreferrer'
                              >
                                <S.CellWrapper onClick={handleCellWrapperClick}>{cell.render('Cell')}</S.CellWrapper>
                              </Link>
                            ) : (
                              <S.CellWrapper onClick={handleCellWrapperClick}>{cell.render('Cell')}</S.CellWrapper>
                            )}
                          </S.StyledTableCell>
                        );
                      })}
                      {displayMenu && (
                        <TableMenuCell
                          hasBorder={lastCellBorder}
                          itemId={row.original[itemIdAccessor] as unknown as IdType}
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          menuOptions={menuOptions!}
                          menuOpener={menuOpener}
                          hasMultipleActions={commentCell}
                          onlyMenu={displayMenu && !isExpandable}
                          menuOpenerButtonVariant={menuOpenerButtonVariant}
                          row={row}
                        />
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <NoResults pageDataKey={pageDataKey} />
              )}
            </S.StyledTableBody>
          </MaterialTable>
        </S.StyledTableContainer>
        {pagination && onPageChange && (
          <S.StyledPagination
            page={pagination.pageInfo?.pageNumber}
            pages={pagination.pageInfo?.totalPages}
            changePage={onPageChange}
            disabled={data.length === 0}
          />
        )}
      </S.TableWrapper>
    </S.MainTableWrapper>
  );
};
