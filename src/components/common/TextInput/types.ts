import type { ChangeEvent } from 'react';
import type { NumberFormatValues, SourceInfo } from 'react-number-format';

export type TOnNumberValueChange = (
  values: NumberFormatValues,
  sourceInfo: Omit<SourceInfo, 'event'> & {
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
  },
) => void;
