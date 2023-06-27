import { useState, useCallback, MouseEvent, ReactNode, useEffect, ComponentProps, useId, ChangeEvent, useRef, useMemo } from 'react';
import { ListItemIcon, PopperPlacementType, BoxProps } from '@mui/material';
import { SxProps } from '@mui/system';
import { debounce } from 'lodash-es';

import { Button, IconButton } from 'components/common/Button';
import { Typography } from 'components/common/Typography';
import MenuWithArrow from './MenuWithArrow';
import { filterItems } from './MenuWithArrow/utils';
import { MenuItemWrapper } from './styled';
import { StyledSearchInput } from './MenuWithArrow/styled';

export type MenuChildClickHandler = () => void;

export type OpenableMenuChild = {
  label: string;
  clickHandler: MenuChildClickHandler;
  icon?: ReactNode;
  disabled?: boolean;
};

type Props = {
  isIconOpener?: boolean;
  openerProps?: ComponentProps<typeof Button>;
  menuId: string;
  childSx?: SxProps;
  childArray: OpenableMenuChild[];
  placement?: PopperPlacementType;
  searchable?: boolean;
  sx?: BoxProps['sx'];
  offset?: number;
  arrow?: boolean;
  cypressName?: string;
};

const OpenableMenu = ({
  isIconOpener = false,
  openerProps,
  menuId,
  childSx,
  childArray,
  placement = 'bottom-end',
  searchable = false,
  sx,
  cypressName,
  offset,
  arrow = false,
}: Props) => {
  const id = useId();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [filteredItems, setFilteredItems] = useState<Array<OpenableMenuChild>>(childArray);
  const [searchText, setSearchText] = useState('');
  const [btnOpenerActive, setBtnOpenerActive] = useState(false);
  const { disabled } = openerProps ?? {};

  const isOpen = Boolean(anchorElement);
  const MenuOpener = isIconOpener ? IconButton : Button;

  const buttonRef = useRef<HTMLButtonElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filter = useCallback(
    debounce((text: string) => setFilteredItems(filterItems(childArray, text)), 300),
    [childArray],
  );

  const isEveryItemDisabled = useMemo(() => childArray.every((item) => item.disabled), [childArray]);

  useEffect(() => {
    filter(searchText);
  }, [filter, searchText]);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
    setBtnOpenerActive(true);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
    setBtnOpenerActive(false);
    setSearchText('');
    buttonRef.current?.focus();
  };

  const handleClick = (childClickHandler: MenuChildClickHandler) => () => {
    handleCloseMenu();
    childClickHandler();
  };

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);

  return (
    <MenuWithArrow
      id={menuId}
      open={isOpen}
      anchorElement={anchorElement}
      textInput={
        searchable ? (
          <StyledSearchInput
            value={searchText}
            onChange={onSearchChange}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={isOpen}
          />
        ) : undefined
      }
      content={
        <>
          {filteredItems.map(({ label, clickHandler, icon, disabled }) => {
            return (
              <MenuItemWrapper
                key={`${id}-menu-item-${label}`}
                onClick={handleClick(clickHandler)}
                disabled={disabled}
                sx={childSx}
                role='button'
                tabIndex={0}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <Typography textAlign='center'>{label}</Typography>
              </MenuItemWrapper>
            );
          })}
        </>
      }
      onClose={handleCloseMenu}
      placement={placement}
      sx={sx}
      offset={offset}
      arrow={arrow}
    >
      <MenuOpener
        onClick={handleOpenMenu}
        ref={buttonRef}
        aria-label={`${btnOpenerActive ? 'Close' : 'Open'} menu`}
        aria-haspopup='true'
        aria-controls={menuId}
        {...(isIconOpener ? {} : { isActive: btnOpenerActive })}
        {...openerProps}
        cypressName={cypressName}
        disabled={disabled || isEveryItemDisabled}
      />
    </MenuWithArrow>
  );
};

export default OpenableMenu;
