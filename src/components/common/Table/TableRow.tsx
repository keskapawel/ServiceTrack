import { Children, FunctionComponent, useCallback, useMemo } from 'react';
import { Collapse, TableRowProps } from '@mui/material';
import { Row } from 'react-table';

import { IconButton } from 'components/common/Button';
import { Icon } from 'components/common/Icon';

import { ExpandedRow, IconCell, NormalRow, StyledTableCell } from './styled';

type Props<ItemType extends object> = TableRowProps & {
  row: Row<ItemType>;
  Expandable?: FunctionComponent<{ row: Row<ItemType> }>;
  width?: number;
  activeHover?: boolean;
  openableOnRowClick?: boolean;
};

export const TableRow = <ItemType extends object>({
  row,
  Expandable,
  children,
  activeHover,
  onClick,
  openableOnRowClick,
  ...props
}: Props<ItemType>) => {
  const colCount = useMemo(() => Children.toArray(children).length, [children]);
  const isExpandable = !!Expandable;

  const handleKeyDown = useCallback((event) => event?.key === 'Enter' && onClick && onClick(event), [onClick]);

  return (
    <>
      <NormalRow
        {...props}
        onClick={onClick}
        $expandable={isExpandable}
        $expanded={row.isExpanded}
        $isHoverActive={activeHover}
        tabIndex={onClick ? 0 : -1}
        onKeyDown={handleKeyDown}
        $clickable={openableOnRowClick && isExpandable}
      >
        {children}

        {isExpandable && (
          <IconCell $hasChevron>
            <IconButton aria-label='expand row' onClick={() => row.toggleRowExpanded()} cypressName='expand-row-table-cell'>
              <Icon size={24} icon={row.isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} />
            </IconButton>
          </IconCell>
        )}
      </NormalRow>

      {isExpandable && (
        <ExpandedRow {...props} $expandable={isExpandable} $expanded={row.isExpanded}>
          <StyledTableCell colSpan={colCount} sx={{ width: '100%', maxWidth: '100%' }}>
            <Collapse in={row.isExpanded} timeout='auto' unmountOnExit sx={{ width: '100%', maxWidth: `100%`, wordBreak: 'break-all' }}>
              <Expandable row={row} />
            </Collapse>
          </StyledTableCell>
        </ExpandedRow>
      )}
    </>
  );
};
