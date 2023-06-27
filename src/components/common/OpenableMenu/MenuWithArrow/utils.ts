import type { OpenableMenuChild } from '..';

export const filterItems = (items: OpenableMenuChild[], text: string) =>
  items.filter((item) => item.label.toUpperCase().includes(text?.toUpperCase()));
