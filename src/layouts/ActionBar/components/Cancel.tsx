import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import { setSelectedButton } from 'reducers/navigationButtons-reducer';
import { EOption } from 'reducers/location-reducer';
import { getParentPath } from 'utils/common';

import { Button } from 'components/common/Button';

import { cancelSubject } from './constants';
import { useUserSelector, toggleEditMode as toggleUserEditMode } from 'reducers/user-reducer';

export const Cancel = () => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { isEditMode: isUserEditMode } = useUserSelector();

  const isEditMode = useMemo(() => {
    return isUserEditMode;
  }, [isUserEditMode]);

  const handleClick = useCallback(() => {
    const parentPath = getParentPath(pathname);

    dispatch(setSelectedButton({ selectedButton: EOption.Cancel }));
    cancelSubject.next();

    if (isEditMode) {
      isUserEditMode && dispatch(toggleUserEditMode({ editMode: false }));
    } else {
      navigation(parentPath);
    }
  }, [dispatch, isEditMode, isUserEditMode, navigation, pathname]);

  return (
    <Button onClick={handleClick} variant={'outlined'} size={'small'} cypressName='cancel-button'>
      Cancel
    </Button>
  );
};
