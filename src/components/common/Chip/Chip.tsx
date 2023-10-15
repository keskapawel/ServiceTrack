import { ChipProps } from '@mui/material';

import { Icon } from 'components/common/Icon';
import { IconButton } from 'components/common/Button';

import { palette } from 'styles/palette';

import { StyledChip } from './styled';

export type ChipType = Pick<ChipProps, 'avatar' | 'label' | 'key' | 'onDelete' | 'disabled'>;

export const Chip = ({ avatar, label, onDelete, disabled }: ChipType) => {
  return (
    <StyledChip
      avatar={avatar}
      label={label}
      onDelete={onDelete}
      disabled={disabled}
      deleteIcon={
        <IconButton aria-label='Remove value'>
          <Icon icon={'XIcon'} color={palette.lockedTextAndPlaceholder} />
        </IconButton>
      }
    />
  );
};
