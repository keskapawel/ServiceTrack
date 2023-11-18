import { useAppDispatch } from 'hooks/store-hook';

import { toggleEditMode, useUserSelector } from 'reducers/user-reducer';

import OpenableMenu from 'components/common/OpenableMenu';
import { Icon } from 'components/common/Icon';
import { Cancel } from './Cancel';
import { Save } from './Save';
import { options, getChildArray, EOptions } from './constants';
import { useNavigate } from 'react-router-dom';
import { useAuthUserSelector } from 'reducers/auth-reducer';
import { EPageType } from 'reducers/location-reducer';

export const LoggedInUserActions = () => {
  const { isEditMode = false } = useUserSelector();
  const { uuid } = useAuthUserSelector();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleClick = (id: string) => {
    switch (id) {
      case EOptions.EDIT_USER:
        dispatch(toggleEditMode({ editMode: true }));
        break;

      case EOptions.CHANGE_PASSWORD:
        navigation(`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}/${uuid}/${EPageType.CHANGE_PASSWORD}`);
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
      cypressName='logged-in-user-actions-button'
      menuId='order-actions-menu'
      childArray={getChildArray(options.loggedInUserActions, handleClick)}
      openerProps={{
        startIcon: <Icon icon='ChevronDownIcon' />,
        children: 'User Actions',
      }}
    />
  );
};
