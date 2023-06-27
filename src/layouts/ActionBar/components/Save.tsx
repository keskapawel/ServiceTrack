import { useAppDispatch } from 'hooks/store-hook';

import { setSelectedButton, useNavigationButtonsSelector } from 'reducers/navigationButtons-reducer';
import { EOption } from 'reducers/location-reducer';

import { Button } from 'components/common/Button';

import { saveSubject } from './constants';

export const Save = () => {
  const dispatch = useAppDispatch();
  const { isValid } = useNavigationButtonsSelector();

  const handleClick = () => {
    dispatch(setSelectedButton({ selectedButton: EOption.Save }));
    saveSubject.next();
  };

  return (
    <Button onClick={handleClick} variant={!isValid ? 'contained' : 'outlined'} size={'small'} disabled={!isValid} cypressName='save-button'>
      Save
    </Button>
  );
};
