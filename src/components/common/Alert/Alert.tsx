import { AlertProps, AlertTitle } from '@mui/material';
import { memo, ReactNode } from 'react';
import { StyledAlert } from './styled';
import { icons } from './constants';

type Props = {
  title?: string;
  children?: ReactNode;
} & Pick<AlertProps, 'icon' | 'severity' | 'variant' | 'sx'>;

const Component = ({ title, children, severity = 'error', variant = 'outlined', ...props }: Props) => {
  return (
    <StyledAlert severity={severity} iconMapping={icons} variant={variant} {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </StyledAlert>
  );
};
Component.displayName = 'Alert';

export const Alert = memo(Component);
