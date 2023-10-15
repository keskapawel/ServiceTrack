/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useMemo, useState } from 'react';
import { QueryDefinition, skipToken } from '@reduxjs/toolkit/query/react';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { intersectionWith } from 'lodash-es';

import { getErrorMessage } from 'services/utils';
import { TBaseQueryFunc } from 'services/types';
import { BASE_TAGS } from 'services/tags';
import { IApiData, IPaginationApiData } from 'models/Api';

import { Select } from 'components/common/Select';
import { Typography } from 'components/common/Typography';

import { TApiSelectCommonProps, TInputValue, TOutputValue, TValue } from './types';

type Props<T extends TValue, Multiple extends boolean = false, DisableClearable extends boolean = false> = TApiSelectCommonProps<
  T,
  Multiple,
  DisableClearable
> & {
  labelKey: keyof T | ((value: T) => string);
  valueKey: keyof T;
  query:
    | UseQuery<QueryDefinition<any, TBaseQueryFunc, BASE_TAGS, IApiData<T[]>, 'api'>>
    | UseQuery<QueryDefinition<any, TBaseQueryFunc, BASE_TAGS, IPaginationApiData<T[]>, 'api'>>
    | UseQuery<QueryDefinition<any, TBaseQueryFunc, BASE_TAGS, T[], 'api'>>;
  label?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  refetchOnMountOrArgChange?: boolean;
  disableBackspaceDeleting?: boolean;
  getOptionDisabled?: (option: T) => boolean;
};

const Component = <T extends TValue, Multiple extends boolean = false, DisableClearable extends boolean = false>({
  value,
  required,
  placeholder,
  onChange,
  error,
  helperText,
  labelKey,
  valueKey,
  name,
  query,
  multiple,
  disabled,
  disableClearable,
  renderChipAvatar,
  onBlur,
  label,
  horizontalLabel,
  staticData,
  textOnly,
  hideLabel,
  showNa,
  showRequiredAfter,
  getOptionDisabled,
  refetchOnMountOrArgChange = false,
  skipToken: skipTokenCondition,
  disableBackspaceDeleting,
}: Props<T, Multiple, DisableClearable>) => {
  const [hasOpened, setHasOpened] = useState(false);

  const {
    isLoading,
    data: queryData,
    isError,
    error: fetchError,
    // fetch only after opening the select
  } = query(skipTokenCondition || (!hasOpened && !value) ? skipToken : {}, {
    refetchOnMountOrArgChange,
  });

  const data: T[] = useMemo(() => {
    if (!queryData) return [];
    if ('data' in queryData) return queryData.data;
    return queryData;
  }, [queryData]);

  const mergedData: T[] = useMemo(() => (staticData ? (staticData as T[]).concat(data ?? []) : data), [data, staticData]);

  const getOptionLabel = (value: T): string => {
    if (value === '') return '';

    return (typeof labelKey === 'function' ? labelKey(value) : value[labelKey]) as unknown as string;
  };

  const isOptionEqualToValue = (option: T, value: T): boolean => {
    if (value === '') return false;

    return option[valueKey] === value[valueKey];
  };

  const handleOnChange = (value: T | T[] | null | undefined) => {
    if (!value && disableClearable) return;
    if (onChange) onChange(value as TOutputValue<T, Multiple, DisableClearable>);
  };

  const hasError = !!error || isError;
  const finalHelperText = helperText ?? getErrorMessage(fetchError);

  const predicate = (dataValue: T, inputValue?: TInputValue<T, Multiple>) => {
    if (typeof inputValue === 'string') return (dataValue[valueKey] as unknown) === inputValue;

    return dataValue[valueKey] === inputValue?.[valueKey as string];
  };

  const mappedValue = useMemo(() => {
    if (Array.isArray(value)) return intersectionWith(mergedData ?? [], value, predicate) ?? [];

    if (!value) return multiple ? [] : null;

    return mergedData?.find((item) => predicate(item, value as TInputValue<T, Multiple>)) ?? null;
  }, [mergedData, value, multiple]);

  const getText = (value: T | T[] | null): string => {
    const isArray = Array.isArray(value);

    if (!value || (isArray && !value?.length)) return 'N/A';

    if (isArray) return value.map(getOptionLabel).join(', ');

    return getOptionLabel(value);
  };

  if (textOnly)
    return (
      <Typography {...(typeof textOnly === 'object' ? textOnly : {})} showNa>
        {getText(mappedValue)}
      </Typography>
    );

  return (
    <Select
      // I do not know how to solve this type error for now
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value={mappedValue || null}
      disableBackspaceDeleting={disableBackspaceDeleting}
      placeholder={placeholder ?? 'Select from the list'}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      options={mergedData ?? []}
      onChange={handleOnChange}
      loading={isLoading}
      error={hasError}
      helperText={finalHelperText}
      onOpen={() => setHasOpened(true)}
      multiple={multiple}
      disabled={disabled}
      disableClearable={disableClearable}
      renderChipAvatar={renderChipAvatar}
      label={label}
      horizontalLabel={horizontalLabel}
      required={required}
      onBlur={onBlur}
      name={name}
      hideLabel={hideLabel}
      showNa={showNa}
      showRequiredAfter={showRequiredAfter}
      getOptionDisabled={getOptionDisabled}
    />
  );
};
Component.displayName = 'ApiSelect';

export const ApiSelect = memo(Component) as typeof Component;
