import { TableLoader, TableProps } from './types';

export const tableCellWidths: Record<string, number> = {
  menu: 48,
};

export const defaultHeaderHeight = 56;
export const defaultRowHeight = 56;

export const defaultTableLoader: Required<Omit<TableLoader, 'isLoading'>> = {
  rows: 10,
};

export const generateTableLoaderOptions = (
  options: TableProps<object>['isLoading'],
  { maxRows }: Pick<TableProps<object>, 'maxRows'>,
): Required<TableLoader> => ({
  ...defaultTableLoader,
  ...(typeof options === 'boolean' || !options
    ? { isLoading: !!options }
    : {
        ...options,
        rows: options.rows ?? maxRows ?? defaultTableLoader.rows,
      }),
});

export const emptyListMessage = {
  DEFAULT: 'No results',
};
