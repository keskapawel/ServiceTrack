import { Grid } from '@mui/material';

import { ITicket } from 'models/Ticket';

import { TextInput } from 'components/common/TextInput';

import { SingleBox } from '../SingleBox';

import * as S from './styled';

interface IProps {
  data: ITicket | undefined;
}

export const MainSection = ({ data }: IProps) => {
  const isEditMode = false;
  return (
    <S.Wrapper>
      <Grid item sx={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <Grid mt={2}>
          <SingleBox title={''} width={12} noBorder>
            <Grid container item rowSpacing={1} columnSpacing={4}>
              <Grid item xs={12}>
                <TextInput
                  // required={isEditMode && updateUserRequiredFields.customerName}
                  showRequiredAfter
                  horizontalLabel
                  label='Reporter name:'
                  value={data?.customerName}
                  disabled={!isEditMode}
                  name='customerName'
                  // onChange={handleChange}
                  showNa
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  horizontalLabel
                  // required={isEditMode && updateUserRequiredFields.assignedTo}
                  showRequiredAfter
                  label='Assigned to:'
                  value={data?.ticketAssignedTo}
                  disabled={!isEditMode}
                  name='assignedTo'
                  // onChange={handleChange}
                  showNa
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  // required={isEditMode && updateUserRequiredFields.subject}
                  showRequiredAfter
                  horizontalLabel
                  label='Subject:'
                  value={data?.ticketSubject}
                  disabled={!isEditMode}
                  name='subject'
                  // onChange={handleChange}
                  showNa
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  // required={isEditMode && updateUserRequiredFields.description}
                  showRequiredAfter
                  horizontalLabel
                  label='Description:'
                  value={data?.ticketDescription}
                  disabled={!isEditMode}
                  name='description'
                  // onChange={handleChange}
                  showNa
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  // required={isEditMode && updateUserRequiredFields.notes}
                  showRequiredAfter
                  horizontalLabel
                  label='Notes:'
                  value={data?.ticketNotes}
                  disabled={!isEditMode}
                  name='notes'
                  // onChange={handleChange}
                  showNa
                  multiline
                />
              </Grid>
            </Grid>
          </SingleBox>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};
