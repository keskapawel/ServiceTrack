import { forwardRef, memo, Ref, useCallback, useId, useMemo } from 'react';
import { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import { isEmpty } from 'lodash-es';

import { palette } from 'styles/palette';

import { EKeyboardKey } from 'models/UtilTypes';

import { TextInput, TextInputType } from 'components/common/TextInput';
import { Icon } from 'components/common/Icon';
import { Loader } from 'components/common/Loader';
import { Chip } from 'components/common/Chip';
import { Typography } from 'components/common/Typography';
import { IconButton } from 'components/common/Button';

import { StyledAdornment, StyledAutocomplete, StyledPopper } from './styled';
import { chipProps } from './constants';

export type SelectProps<T, Multiple extends boolean = false, DisableClearable extends boolean = false, FreeSolo extends boolean = false> = {
  onChange?: (value: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['value']) => void;
  error?: boolean;
  required?: boolean;
  hideLabel?: boolean;
  viewAllFunction?: false | (() => void);
  renderChipAvatar?: (option: T) => JSX.Element;
  showNa?: boolean;
  inline?: boolean;
  showRequiredAfter?: boolean;
  disableBackspaceDeleting?: boolean;
} & Pick<TextInputType, 'placeholder' | 'InputProps' | 'helperText' | 'label' | 'name' | 'horizontalLabel'> &
  Pick<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    | 'options'
    | 'loading'
    | 'multiple'
    | 'disableClearable'
    | 'freeSolo'
    | 'isOptionEqualToValue'
    | 'getOptionLabel'
    | 'size'
    | 'fullWidth'
    | 'disableCloseOnSelect'
    | 'ChipProps'
    | 'value'
    | 'renderTags'
    | 'defaultValue'
    | 'disabled'
    | 'onOpen'
    | 'limitTags'
    | 'onBlur'
    | 'getOptionDisabled'
  >;

// eslint-disable-next-line react/display-name
const Component = <T, Multiple extends boolean = false, DisableClearable extends boolean = false, FreeSolo extends boolean = false>(
  {
    onChange,
    onBlur,
    error,
    disabled,
    placeholder,
    InputProps,
    multiple,
    helperText,
    limitTags,
    loading,
    value,
    getOptionLabel,
    renderChipAvatar,
    label,
    name,
    required = false,
    hideLabel,
    viewAllFunction,
    horizontalLabel,
    showNa,
    inline,
    options,
    showRequiredAfter,
    getOptionDisabled,
    disableBackspaceDeleting,
    ...autocompleteProps
  }: SelectProps<T, Multiple, DisableClearable, FreeSolo>,
  ref: Ref<HTMLElement>,
) => {
  const isNaShown = showNa && disabled && !value;
  const generatedPlaceholder = useMemo(() => (isNaShown ? 'N/A' : isEmpty(value) ? placeholder : ''), [isNaShown, placeholder, value]);
  const id = useId();

  const disableBackspace = useCallback(
    (event) => {
      if (disableBackspaceDeleting && event.key === EKeyboardKey.BACKSPACE) {
        event.stopPropagation();
      }
    },
    [disableBackspaceDeleting],
  );

  const renderInput = useCallback(
    ({ InputProps: renderInputProps, ...params }: AutocompleteRenderInputParams) => {
      const { endAdornment } = renderInputProps;
      const {
        inputProps: { value },
      } = params;

      return (
        <TextInput
          required={required}
          sx={
            inline
              ? {
                  maxWidth: '25%',
                  flexBasis: '25%',
                  flexGrow: 0,
                  top: '-9px',
                }
              : {}
          }
          showRequiredAfter={showRequiredAfter}
          InputProps={{
            ...renderInputProps,
            ...InputProps,
            endAdornment: loading ? (
              <StyledAdornment position='end'>
                <Loader type='small' size={16} />
              </StyledAdornment>
            ) : viewAllFunction ? (
              <StyledAdornment position='end'>
                <IconButton aria-label='View All' onClick={viewAllFunction}>
                  <Typography>view all</Typography>
                </IconButton>
              </StyledAdornment>
            ) : (
              endAdornment
            ),
          }}
          value={value}
          {...params}
          label={label}
          name={name}
          hideLabel={hideLabel}
          error={error}
          placeholder={loading ? 'Loading...' : generatedPlaceholder}
          helperText={helperText}
          horizontalLabel={horizontalLabel}
          showNa={showNa}
          disabled={disabled}
          onKeyDown={disableBackspace}
        />
      );
    },
    [
      required,
      inline,
      showRequiredAfter,
      InputProps,
      loading,
      viewAllFunction,
      label,
      name,
      hideLabel,
      error,
      generatedPlaceholder,
      helperText,
      horizontalLabel,
      showNa,
      disabled,
      disableBackspace,
    ],
  );

  const handleOnChange = useCallback<Required<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>>['onChange']>(
    (_, data) => {
      if (onChange) onChange(data);
    },
    [onChange],
  );

  const renderTags: Required<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>>['renderTags'] = useCallback(
    (tagValue, getTagProps) =>
      tagValue.map((option, index) => (
        <Chip
          avatar={renderChipAvatar ? renderChipAvatar(option) : undefined}
          label={getOptionLabel ? getOptionLabel(option) : ''}
          {...getTagProps({ index })}
          key={`select-${id}-chip-${index}`}
          disabled={getOptionDisabled?.(option) || false}
        />
      )),
    [renderChipAvatar, getOptionLabel, id, getOptionDisabled],
  );

  const conditionalColor = disabled ? palette.lightIcon : palette.baseColor;

  return (
    <StyledAutocomplete
      PopperComponent={StyledPopper}
      disableCloseOnSelect={multiple}
      options={options || []}
      {...autocompleteProps}
      disabled={disabled}
      value={value}
      loadingText={'Loading...'}
      loading={loading}
      renderInput={renderInput}
      onChange={handleOnChange}
      ref={ref}
      multiple={multiple}
      clearIcon={<Icon icon='XIcon' color={palette.baseColor} size={20} />}
      popupIcon={<Icon icon='ChevronDownIcon' color={conditionalColor} outline />}
      ChipProps={chipProps}
      limitTags={limitTags ?? 2}
      getOptionLabel={getOptionLabel}
      renderTags={renderTags}
      onBlur={onBlur}
      getOptionDisabled={getOptionDisabled}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */ // => generic type is broken with styled-components
      $isNaShown={isNaShown}
    />
  );
};
Component.displayName = 'Select';

// forwardRef breaks generic typing, so it has to be separated
export const Select = memo(forwardRef(Component)) as typeof Component;
