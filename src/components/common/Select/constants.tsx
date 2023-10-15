import { ChipProps } from '@mui/material';

import { IconButton } from 'components/common/Button';
import { Icon } from 'components/common/Icon';

import { palette } from 'styles/palette';

export const chipProps: ChipProps = {
  deleteIcon: (
    <IconButton size='small' aria-label='Remove value'>
      <Icon icon='XIcon' color={palette.lockedTextAndPlaceholder} size={20} />
    </IconButton>
  ),
  sx: { borderRadius: `8px` },
};
