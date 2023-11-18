import { Icon } from 'components/common/Icon';

export enum EOptions {
  EDIT_USER = 'editUser',
  EDIT_TICKET = 'editTicket',
  CHANGE_PASSWORD = 'changePassword',
}

export const options = {
  loggedInUserActions: [
    {
      id: EOptions.EDIT_USER,
      label: 'Edit User',
      icon: 'PencilIcon',
    },
    {
      id: EOptions.CHANGE_PASSWORD,
      label: 'Change password',
      icon: 'LockClosedIcon',
    },
  ],
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
