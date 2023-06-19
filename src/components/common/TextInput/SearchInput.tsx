import { ComponentProps, forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';

import { Icon } from 'components/common/Icon';

import { TextInput } from './TextInput';
import { AdornmentButton } from './styled';
import { StyledSearchInput } from './styledTextInput';
import { palette } from 'styles/palette';

export type Props = Omit<ComponentProps<typeof TextInput>, 'type'> & { cypressName?: string };

const Component = forwardRef<HTMLInputElement, Props>(({ value, InputProps, onChange, cypressName, ...props }: Props, ref) => {
  const innerRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const showClearIcon = !!value;

  const clearSearch = useCallback(() => {
    if (innerRef.current) {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set?.call(innerRef.current, '');

      const event = new Event('change', { bubbles: true });

      innerRef.current.dispatchEvent(event);
    }
  }, []);

  return (
    <StyledSearchInput
      data-cy={cypressName}
      ref={innerRef}
      InputProps={{
        ...InputProps,
        startAdornment: <Icon icon={'SearchIcon'} color={palette.lockedTextAndPlaceholder} />,
        endAdornment: showClearIcon ? (
          <AdornmentButton onClick={clearSearch} className='icon-close' hoverColor={palette.baseColorHover}>
            <Icon icon='XIcon' color={palette.lockedTextAndPlaceholder} />
          </AdornmentButton>
        ) : undefined,
      }}
      value={value}
      hideLabel
      label='Search'
      placeholder='Search'
      onChange={onChange}
      type='search'
      {...props}
    />
  );
});

Component.displayName = 'SearchInput';

export const SearchInput = memo(Component) as typeof Component;
