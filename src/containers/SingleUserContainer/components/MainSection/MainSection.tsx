import { Grid } from '@mui/material';

import { IUser } from 'models/User';

import { TextInput } from 'components/common/TextInput';

import { SingleBox } from '../SingleBox';

import * as S from './styled';

interface IProps {
  data: IUser | undefined;
}

export const MainSection = ({ data }: IProps) => {
  return (
    <S.Wrapper>
      <Grid item sx={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <Grid mt={2}>
          <SingleBox title={''} width={12} noBorder>
            <Grid container item rowSpacing={1} columnSpacing={4}>
              <Grid item xs={12}>
                <TextInput
                  // required={isEditMode && updateUserRequiredFields.name}
                  showRequiredAfter
                  horizontalLabel
                  label='Name:'
                  value={data?.firstName}
                  disabled
                  name='firstName'
                  // onChange={handleChange}
                  showNa
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  horizontalLabel
                  // required={isEditMode && updateUserRequiredFields.surname}
                  showRequiredAfter
                  label='Surname:'
                  value={data?.lastName}
                  disabled
                  name='lastName'
                  // onChange={handleChange}
                  showNa
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  // required={isEditMode && updateUserRequiredFields.email}
                  showRequiredAfter
                  horizontalLabel
                  label='E-mail:'
                  value={data?.email}
                  disabled
                  name='email'
                  // onChange={handleChange}
                  showNa
                />
              </Grid>
            </Grid>
          </SingleBox>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};
