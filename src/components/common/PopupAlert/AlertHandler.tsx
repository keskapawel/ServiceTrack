import { useAppSelector } from 'hooks/store-hook';

import { PopupAlert } from './PopupAlert';

export const AlertHandler = () => {
  const alertPopupData = useAppSelector((state) => state.popupAlert);
  const { message, visible, variant } = alertPopupData;

  return visible ? <PopupAlert alertMessage={message} visible={visible} variant={variant} /> : <></>;
};
