import { TooltipProps } from '@mui/material';

import { fontSize } from 'styles/font';
import { palette } from 'styles/palette';
import { stopPropagation } from 'styles/utils';

export const tooltipComponentProps: Required<TooltipProps>['componentsProps'] = {
  tooltip: {
    sx: {
      bgcolor: palette.baseColor,
      color: palette.white,
      fontSize: fontSize[12],
      maxWidth: '347px',
      wordBreak: 'break-all',
      overflowY: 'scroll',
      maxHeight: '45vh',
      cursor: 'default',
    },
  },
};

export const tooltipPopperProps: Required<TooltipProps>['PopperProps'] = {
  onClick: stopPropagation, // prevent parent click events working when clicking on Tooltip text
  modifiers: [
    {
      name: 'preventOverflow',
      options: {
        padding: 24,
        altAxis: true,
      },
    },
  ],
};
