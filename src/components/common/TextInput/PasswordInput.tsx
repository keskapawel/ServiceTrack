import { ComponentProps, useState, forwardRef, memo } from 'react';
import InputAdornment from '@mui/material/InputAdornment';

import { Icon } from 'components/common/Icon';

import { TextInput } from './TextInput';
import { palette } from 'styles/palette';
import { AdornmentButton } from './styled';

export type PasswordInputProps = Omit<ComponentProps<typeof TextInput>, 'type'> & {
  showRequirements?: boolean;
};

const Component = forwardRef<HTMLInputElement, PasswordInputProps>(({ showRequirements, helperText, ...props }: PasswordInputProps, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

  return (
    <TextInput
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            <AdornmentButton aria-label='toggle password visibility' onClick={handleClickShowPassword}>
              <Icon icon='EyeIcon' {...(showPassword ? { color: palette.lockedTextAndPlaceholder } : {})} />
            </AdornmentButton>
          </InputAdornment>
        ),
      }}
      {...props}
      helperText={[
        ...(showRequirements
          ? ['Password should contain 12 characters including at least 1 numeric, 1 alphabetic and 1 special character (e.g., $, #, !).']
          : []),
        helperText,
      ]}
    />
  );
});

Component.displayName = 'PasswordInput';

export const PasswordInput = memo(Component) as typeof Component;
