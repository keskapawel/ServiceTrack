import { memo, ReactElement, useMemo } from 'react';
import { Row } from 'react-table';

import { IconCell } from './styled';
// import { isFunction } from 'lodash-es';
import _ from 'lodash';
import { TableMenuOption } from './types';
import { Icon } from '../Icon';
import { ButtonType } from '../Button';
import OpenableMenu from '../OpenableMenu';

export type TableMenuCellProps<ItemType extends object, IdType> = {
  row: Row<ItemType>;
  itemId: IdType;
  hasBorder: boolean;
  menuOpener?: ReactElement;
  menuOptions: TableMenuOption<ItemType, IdType>[];
  onlyMenu?: boolean;
  menuOpenerButtonVariant: ButtonType['variant'];
  hasMultipleActions?: boolean;
};

export const TableMenuCellComponent = <ItemType extends object, IdType>({
  hasBorder,
  onlyMenu,
  menuOptions,
  hasMultipleActions,
  row,
  itemId,
  menuOpenerButtonVariant,
}: TableMenuCellProps<ItemType, IdType>) => {
  const options: TableMenuOption<ItemType, IdType>[] = useMemo(() => {
    // if (_.isFunction(menuOptions)) return menuOptions(row.original);

    return menuOptions;
  }, [menuOptions]);
  return (
    <IconCell
      $hasMenu
      $hasMultipleActions={hasMultipleActions}
      $onlyMenu={onlyMenu}
      sx={{
        borderLeft: hasBorder ? '1px solid #EAECEF' : 'unset',
      }}
    >
      <OpenableMenu
        menuId={`table-item-${itemId}-menu`}
        openerProps={{
          title: 'Open row menu',
          variant: menuOpenerButtonVariant,
          startIcon: <Icon icon='DotsHorizontalIcon' />,
        }}
        childArray={options.map((menuOption) => ({
          ...menuOption,
          clickHandler: () => menuOption.clickHandler(itemId, row.original),
        }))}
        placement='bottom-end'
        offset={2}
      />
    </IconCell>
  );
};

export const TableMenuCell = memo(TableMenuCellComponent) as typeof TableMenuCellComponent;
