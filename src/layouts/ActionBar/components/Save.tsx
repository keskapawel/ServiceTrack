import { useAppDispatch } from 'hooks/store-hook';

import { EOption } from 'reducers/location-reducer';

import { Button } from 'components/common/Button';

import { useNavigationButtonsSelector, setSelectedButton } from 'reducers/navigationButtons-reducer';

export const Save = () => {
  const dispatch = useAppDispatch();
  const { isValid } = useNavigationButtonsSelector();

  const handleClick = () => {
    dispatch(setSelectedButton({ selectedButton: EOption.Save }));
  };

  return (
    <Button onClick={handleClick} variant={!isValid ? 'contained' : 'outlined'} size={'small'} disabled={!isValid} cypressName='save-button'>
      Save
    </Button>
  );
};
