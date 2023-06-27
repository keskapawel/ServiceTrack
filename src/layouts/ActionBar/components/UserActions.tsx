import { useAppDispatch } from 'hooks/store-hook';

import { toggleEditMode, useUserSelector } from 'reducers/user-reducer';

import OpenableMenu from 'components/common/OpenableMenu';
import { Icon } from 'components/common/Icon';
import { Cancel } from './Cancel';
import { Save } from './Save';
import { options, getChildArray, EOptions } from './constants';

export const UserActions = () => {
  const { isEditMode = false } = useUserSelector();
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    switch (id) {
      case EOptions.EDIT_USER:
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
      cypressName='user-actions-button'
      menuId='order-actions-menu'
      childArray={getChildArray(options.userActions, handleClick)}
      openerProps={{
        startIcon: <Icon icon='ChevronDownIcon' />,
        children: 'User Actions',
      }}
    />
  );
};
