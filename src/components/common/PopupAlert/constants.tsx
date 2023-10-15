import { Icon } from '../Icon';
import { palette } from 'styles/palette';

export const icons = {
  success: <Icon icon='CheckCircleIcon' color={palette.green} />,
  warning: <Icon icon='ExclamationIcon' color={palette.orange} />,
  error: <Icon icon='XCircleIcon' color={palette.red} />,
  info: <Icon icon='ExclamationIcon' color={palette.baseColor} />,
};

export enum AlertVariants {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}
