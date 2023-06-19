import { memo, forwardRef } from 'react';
import { IconButtonProps } from '@mui/material';

import { StyledIconButton } from './styled';

type Props = { hoverColor?: string; cypressName?: string } & Pick<
  IconButtonProps,
  'color' | 'children' | 'disabled' | 'onClick' | 'size' | 'aria-haspopup' | 'aria-controls' | 'aria-label' | 'sx' | 'id' | 'title' | 'className'
>;

const Component = forwardRef<HTMLButtonElement, Props>(({ children, hoverColor, cypressName, ...props }: Props, ref) => (
  <StyledIconButton {...props} $hoverColor={hoverColor} disableRipple ref={ref} data-cy={cypressName}>
    {children}
  </StyledIconButton>
));
Component.displayName = 'IconButton';

export const IconButton = memo(Component);
