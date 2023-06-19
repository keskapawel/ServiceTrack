import { forwardRef, memo, useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import type { InputAttributes, InternalNumberFormatBase, NumericFormatProps, OnValueChange } from 'react-number-format/types/types';

import { TextInput, TextInputType } from './TextInput';
import type { TOnNumberValueChange } from './types';

type Props = TextInputType &
  Pick<NumericFormatProps, 'value' | 'defaultValue' | 'type'> & {
    numberOptions?: Omit<NumericFormatProps, keyof InternalNumberFormatBase | keyof InputAttributes | 'customInput'>;
  };

const Component = forwardRef(({ onChange, numberOptions, ...props }: Props, ref) => {
  const handleChange = useCallback<TOnNumberValueChange>(
    ({ value }, { event }) => {
      if (onChange && event) {
        // assign raw value, not formatted by input
        event.target.value = value;

        onChange(event);
      }
    },
    [onChange],
  );
  return (
    <NumericFormat
      customInput={TextInput}
      valueIsNumericString
      getInputRef={ref}
      onValueChange={handleChange as OnValueChange}
      decimalScale={2}
      thousandSeparator=' '
      decimalSeparator='.'
      {...numberOptions}
      {...props}
    />
  );
});

Component.displayName = 'NumberInput';

export const NumberInput = memo(Component) as typeof Component;
