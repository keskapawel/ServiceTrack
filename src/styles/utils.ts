import { UIEvent } from 'react';

export const stopPropagation = <T extends Element, E extends UIEvent<T>>(event: E) => {
  event.stopPropagation();
};
