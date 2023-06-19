import { ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';

import { palette } from 'styles/palette';

import * as S from './styled';

interface IProps {
  title: string;
  noBackground?: boolean;
  noBorder?: boolean;
  fullHeight?: boolean;
  specificPadding?: string;
  width: 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children?: ReactNode;
}

export const SingleBox = ({ title, noBackground, noBorder, specificPadding, width, children, fullHeight }: IProps) => {
  return (
    <S.Wrapper $fullHeight={fullHeight}>
      <Typography>{title}</Typography>
      <Grid spacing={1} container mt={1} height={'100%'} ml={0}>
        <Grid
          item
          xs={width}
          sx={{
            background: noBackground ? 'none' : palette.white,
            borderRadius: '8px',
            border: noBorder ? `none` : ` 1px solid ${palette.outline}`,
            padding: specificPadding ?? '20px',
          }}
        >
          {children}
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};
