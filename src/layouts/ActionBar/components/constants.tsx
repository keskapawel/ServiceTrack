import { Subject } from 'rxjs';

import { Icon } from 'components/common/Icon';

export enum EOptions {
  EDIT_USER = 'editUser',
  EDIT_TICKET = 'editTicket',
}

export const options = {
  userActions: [
    {
      id: EOptions.EDIT_USER,
      label: 'Edit User',
      icon: 'PencilIcon',
    },
  ],
  ticketActions: [
    {
      id: EOptions.EDIT_TICKET,
      label: 'Edit Ticket',
      icon: 'PencilIcon',
    },
  ],
};

export const getChildArray = (options, handleClick, disableAll?: boolean) => {
  return options.map(({ id, label, icon }) => ({
    id: id,
    label: label,
    icon: <Icon icon={icon} />,
    clickHandler: () => handleClick(id),
    disabled: !!disableAll,
  }));
};

export const saveSubject = new Subject<void>();
export const createSubject = new Subject<void>();
export const cancelSubject = new Subject<void>();
