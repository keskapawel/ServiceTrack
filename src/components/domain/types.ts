/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, FocusEvent, ComponentProps } from 'react';

import type { Typography } from 'components/common/Typography';

export type TValue = string | Record<string, any>;

export type TInputValue<T extends TValue, Multiple extends boolean = false> = T | string;

export type TOutputValue<T extends TValue, Multiple extends boolean = false, DisableClearable extends boolean = true> =
  | (Multiple extends true ? T[] : T)
  | (DisableClearable extends true ? never : null | undefined);

export type TApiSelectCommonProps<T extends TValue, Multiple extends boolean = false, DisableClearable extends boolean = true> = {
  value: (Multiple extends true ? TInputValue<T, Multiple>[] : TInputValue<T, Multiple>) | null | undefined;
  onChange?: (value: TOutputValue<T, Multiple, DisableClearable>) => void;
  multiple?: Multiple;
  disableClearable?: DisableClearable;
  error?: boolean;
  helperText?: ReactNode;
  disabled?: boolean;
  showRequiredAfter?: boolean;
  hideLabel?: boolean;
  label?: string;
  horizontalLabel?: boolean;
  placeholder?: string;
  renderChipAvatar?: (option: T) => JSX.Element;
  staticData?: Partial<T>[];
  required?: boolean;
  onBlur?(e: FocusEvent<HTMLInputElement>);
  name?: string;
  textOnly?: boolean | ComponentProps<typeof Typography>;
  showNa?: boolean;
  getOptionDisabled?: (option: T) => boolean;
  skipToken?: boolean;
};
