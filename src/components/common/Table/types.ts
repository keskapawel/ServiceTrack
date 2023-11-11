import { FunctionComponent, ReactElement } from 'react';
import { Row, TableOptions } from 'react-table';

import { IMeta } from 'models/Meta';

import { ButtonType } from 'components/common/Button';

import type { OpenableMenuChild } from 'components/common/OpenableMenu';

export type TableMenuOption<ItemType extends object, IdType> = Omit<OpenableMenuChild, 'clickHandler'> & {
  clickHandler: (itemId: IdType, item: ItemType) => void;
};

export type TableProps<ItemType extends object, IdType = string> = Pick<TableOptions<ItemType>, 'columns' | 'data'> & {
  menuOptions?: TableMenuOption<ItemType, IdType>[];
  itemIdAccessor: keyof ItemType;
  enableSortBy?: boolean;
  linkConstructor?: string;
  commentCell?: boolean;
  headerHeight?: number;
  rowHeight?: number;
  maxRows?: number;
  isLoading?: boolean | TableLoader;
  lastCellBorder?: boolean;
  onRowClick?: (rowData: ItemType) => void;
  menuOpener?: ReactElement;
  menuOpenerButtonVariant?: ButtonType['variant'];
  Expandable?: FunctionComponent<{ row: Row<ItemType> }>;
  pagination?: IMeta;
  onPageChange?: (page: number) => void;
  pageDataKey?: string; // only use on not regular pages, like search in modal
  openableOnRowClick?: boolean;
  redirectOnClick?: boolean;
};

export type TableLoader = {
  isLoading: boolean;
  rows?: number;
};
