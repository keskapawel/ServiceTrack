import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';
import { memo } from 'react';

import { tooltipPopperProps, tooltipComponentProps } from './constants';

const Component = (props: TooltipProps) => (
  <MuiTooltip componentsProps={tooltipComponentProps} PopperProps={tooltipPopperProps} {...props} tabIndex={0} />
);
Component.displayName = 'Tooltip';

export const Tooltip = memo(Component) as typeof Component;
