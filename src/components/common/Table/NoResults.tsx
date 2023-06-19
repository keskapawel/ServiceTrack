import { memo } from 'react';
import { Stack, TableRow } from '@mui/material';

import { Typography } from 'components/common/Typography';

import { StyledTableCell } from './styled';
import { emptyListMessage } from './constants';

export type Props = {
  pageDataKey?: string;
};

export const Component = ({ pageDataKey }: Props): JSX.Element => {
  return (
    <TableRow>
      <StyledTableCell colSpan={999} $fullHeight>
        <Stack alignItems='center' flex={1} spacing='12px'>
          <Typography variant='h2'>{emptyListMessage.DEFAULT}</Typography>
        </Stack>
      </StyledTableCell>
    </TableRow>
  );
};
Component.displayName = 'NoResults';

export const NoResults = memo(Component);
