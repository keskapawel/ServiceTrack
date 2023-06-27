import { useAppDispatch } from 'hooks/store-hook';

import { toggleEditMode, useTicketSelector } from 'reducers/ticket-reducer';

import OpenableMenu from 'components/common/OpenableMenu';
import { Icon } from 'components/common/Icon';
import { Cancel } from './Cancel';
import { Save } from './Save';
import { options, getChildArray, EOptions } from './constants';

export const TicketActions = () => {
  const { isEditMode = false } = useTicketSelector();
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    switch (id) {
      case EOptions.EDIT_TICKET:
        dispatch(toggleEditMode({ editMode: true }));
        break;

      default:
        break;
    }
  };

  return isEditMode ? (
    <>
      <Cancel />
      <Save />
    </>
  ) : (
    <OpenableMenu
      cypressName='ticket-actions-button'
      menuId='order-actions-menu'
      childArray={getChildArray(options.ticketActions, handleClick)}
      openerProps={{
        startIcon: <Icon icon='ChevronDownIcon' />,
        children: 'Ticket Actions',
      }}
    />
  );
};
