import { memo } from 'react';
import { Stack } from '@mui/material';

import { StyledCircularProgress } from './styled';

type Props = {
  type?: 'small' | 'big';
  size?: number;
};
const Component = ({ type = 'big', size }: Props) => {
  if (type === 'small') return <StyledCircularProgress $type={type} size={size} />;

  return (
    <Stack direction={'row'} width='100%' height='100%' justifyContent='center'>
      <StyledCircularProgress $type={type} size={size} aria-label='Loading label' role='progressbar' aria-busy='true' />
    </Stack>
  );
};
Component.displayName = 'Loader';

export const Loader = memo(Component);
