import { forwardRef, ElementType, memo } from 'react';
import { LoadingButtonProps } from '@mui/lab/LoadingButton';

import { StyledButton } from './styled';

export type ButtonType = Pick<
  LoadingButtonProps,
  | 'variant'
  | 'color'
  | 'children'
  | 'onClick'
  | 'size'
  | 'fullWidth'
  | 'startIcon'
  | 'type'
  | 'loading'
  | 'disabled'
  | 'title'
  | 'href'
  | 'aria-label'
  | 'aria-haspopup'
  | 'aria-controls'
  | 'tabIndex'
> & { component?: ElementType; isActive?: boolean; target?: string; cypressName?: string };

const Component = forwardRef<HTMLButtonElement, ButtonType>(
  (
    { children, variant = 'contained', size = 'medium', startIcon, isActive = false, component = 'button', cypressName, ...props }: ButtonType,
    reference,
  ) => (
    <StyledButton
      data-cy={cypressName}
      startIcon={startIcon}
      variant={isActive ? 'contained' : variant}
      size={size}
      component={component}
      disableElevation
      disableRipple
      ref={reference}
      {...props}
    >
      {children}
    </StyledButton>
  ),
);

Component.displayName = 'Button';

export const Button = memo(Component);
