import { memo, ReactElement } from 'react';
import { Row } from 'react-table';

import { IconCell } from './styled';

export type TableMenuCellProps<ItemType extends object, IdType> = {
  row: Row<ItemType>;
  itemId: IdType;
  hasBorder: boolean;
  menuOpener?: ReactElement;
  onlyMenu?: boolean;
  hasMultipleActions?: boolean;
};

export const TableMenuCellComponent = <ItemType extends object, IdType>({
  hasBorder,
  onlyMenu,
  hasMultipleActions,
}: TableMenuCellProps<ItemType, IdType>) => {
  return (
    <IconCell
      $hasMenu
      $hasMultipleActions={hasMultipleActions}
      $onlyMenu={onlyMenu}
      sx={{
        borderLeft: hasBorder ? '1px solid #EAECEF' : 'unset',
      }}
      data-cy={'expand-menu-table-cell'}
    />
  );
};

export const TableMenuCell = memo(TableMenuCellComponent) as typeof TableMenuCellComponent;
