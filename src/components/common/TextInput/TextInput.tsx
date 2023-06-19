import { ChangeEventHandler, forwardRef, memo, useCallback, useMemo } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment, InputProps } from '@mui/material';

import { palette } from 'styles/palette';

import { Icon } from 'components/common/Icon';
import { Typography } from 'components/common/Typography';

import { StyledTextField, CurrencySign } from './styled';
import { NEW_LINE_REGEX } from './constants';

export type TextInputType = {
  optional?: boolean;
  lock?: boolean;
  externalIcon?: boolean;
  showCurrency?: boolean;
  hideLabel?: boolean;
  limitRows?: number;
  showNa?: boolean;
  blacklist?: string[];
  horizontalLabel?: boolean;
  showRequiredAfter?: boolean;
  maxLength?: number;
  cypressName?: string;
} & Pick<
  TextFieldProps,
  | 'label'
  | 'error'
  | 'disabled'
  | 'defaultValue'
  | 'placeholder'
  | 'helperText'
  | 'InputProps'
  | 'type'
  | 'value'
  | 'onChange'
  | 'onBlur'
  | 'onFocus'
  | 'fullWidth'
  | 'multiline'
  | 'rows'
  | 'sx'
  | 'size'
  | 'onKeyDown'
  | 'name'
  | 'id'
  | 'aria-labelledby'
  | 'InputLabelProps'
  | 'required'
  | 'inputProps'
  | 'className'
  | 'autoFocus'
>;

const Component = forwardRef<HTMLInputElement, TextInputType>(
  (
    {
      label,
      fullWidth = true,
      value,
      InputProps,
      sx,
      size = 'small',
      lock,
      externalIcon,
      showCurrency,
      InputLabelProps,
      placeholder,
      hideLabel,
      disabled,
      required,
      onChange,
      limitRows,
      showNa,
      blacklist,
      horizontalLabel,
      showRequiredAfter,
      cypressName,
      maxLength,
      inputProps = {},
      ...props
    }: TextInputType,
    ref,
  ) => {
    const commonInputProps: Partial<InputProps> = useMemo(
      () => ({
        ...(externalIcon
          ? {
              endAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'LinkIcon'} color={palette.lightIcon} />
                </InputAdornment>
              ),
            }
          : lock
          ? {
              endAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='LockClosedIcon' color={palette.lightIcon} />
                </InputAdornment>
              ),
            }
          : {}),
        ...(showCurrency && !!value
          ? {
              startAdornment: <CurrencySign>&#36;</CurrencySign>, // USD -> $
            }
          : {}),
        ...InputProps,
      }),
      [externalIcon, lock, showCurrency, value, InputProps],
    );

    const inputLabel = useMemo(
      () => (
        <>
          {showRequiredAfter ? (
            <>
              {label}
              {required && <Typography color={palette.alert}> *</Typography>}
            </>
          ) : (
            <>
              {required && <Typography color={palette.alert}>* </Typography>}
              {label}
            </>
          )}
        </>
      ),
      [label, required, showRequiredAfter],
    );

    const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback(
      (event) => {
        const linesCountAfterUpdate = event.target.value?.split(NEW_LINE_REGEX).length ?? 1;

        if (limitRows && linesCountAfterUpdate > limitRows) return;

        if (onChange) {
          const blacklistRegex = new RegExp(blacklist?.join('|') ?? '', 'gi');

          if (blacklist?.length && blacklistRegex.test(event.target.value)) {
            event.preventDefault();
          } else {
            onChange(event);
          }
        }
      },
      [onChange, limitRows, blacklist],
    );

    const isNaShown = showNa && (disabled || lock) && !value;

    const mappedValue = useMemo(() => {
      if (value) return value;

      if (isNaShown) return 'N/A';

      return '';
    }, [value, isNaShown]);

    const setPlaceholder = useMemo(() => {
      return placeholder ?? 'Enter detail';
    }, [placeholder]);

    return (
      <StyledTextField
        data-cy={cypressName}
        inputRef={ref}
        label={inputLabel}
        placeholder={setPlaceholder}
        fullWidth={fullWidth}
        InputProps={commonInputProps}
        value={mappedValue}
        sx={sx}
        size={size}
        $hideLabel={hideLabel}
        InputLabelProps={{ ...InputLabelProps, shrink: false, focused: true }}
        $showCurrency={showCurrency && !!value}
        disabled={disabled || lock}
        onChange={handleChange}
        $horizontalLabel={horizontalLabel}
        $isNaShown={isNaShown}
        inputProps={{ ...inputProps, maxLength }}
        {...props}
      />
    );
  },
);

Component.displayName = 'TextInput';

export const TextInput = memo(Component) as typeof Component;
