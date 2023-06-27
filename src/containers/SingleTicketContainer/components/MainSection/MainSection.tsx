import { Grid } from '@mui/material';
import { isEqual } from 'lodash-es';

import { ITicket } from 'models/Ticket';
import { toggleEditMode, useTicketSelector } from 'reducers/ticket-reducer';
import { useFormik } from 'formik';

import { TextInput } from 'components/common/TextInput';

import { SingleBox } from '../SingleBox';

import * as S from './styled';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch } from 'hooks/store-hook';
import { validationSchema, initialFormValues, requiredFields } from './constants';
import { clearSelection, setIsValid, useNavigationButtonsSelector } from 'reducers/navigationButtons-reducer';
import { EOption } from 'reducers/location-reducer';

interface IProps {
  data: ITicket | undefined;
}

export const MainSection = ({ data }: IProps) => {
  const dispatch = useAppDispatch();
  const { isEditMode } = useTicketSelector();
  const { selectedButton } = useNavigationButtonsSelector();

  useEffect(() => {
    return () => {
      dispatch(toggleEditMode({ editMode: false }));
    };
  }, []);

  const onSubmit = useCallback((data: any) => {
    console.log(data, 'data');
  }, []);

  const formik = useFormik({
    validationSchema,
    initialValues: data ? data : initialFormValues,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  const { values, errors, touched, isValid, initialValues, handleChange, resetForm, validateForm } = formik;

  useEffect(() => {
    validateForm();
    return () => {
      resetForm();
    };
  }, [resetForm, validateForm]);

  const isEqualToInitial = useMemo(() => {
    return isEqual(initialValues, values);
  }, [initialValues, values]);

  useEffect(() => {
    if (isEditMode) {
      dispatch(setIsValid({ isValid: !isEqualToInitial && isValid }));
    }
  }, [dispatch, errors, isEditMode, isEqualToInitial, isValid, values]);

  useEffect(() => {
    if (selectedButton === EOption.Save && isValid) {
      dispatch(clearSelection());
      onSubmit(values);
    }

    if (selectedButton === EOption.Cancel) {
      dispatch(clearSelection());
      dispatch(toggleEditMode({ editMode: false }));
      resetForm();
      // createNewMode && navigate(`/${EPageType.SETTINGS}/${EPageType.GROUPS}`);
    }
  }, [dispatch, isValid, onSubmit, resetForm, selectedButton, values]);

  return (
    <S.Wrapper>
      <Grid item sx={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <Grid mt={2}>
          <SingleBox title={''} width={12} noBorder>
            <Grid container item rowSpacing={1} columnSpacing={4}>
              <Grid item xs={12}>
                <TextInput
                  required={isEditMode && requiredFields.customerName}
                  showRequiredAfter
                  horizontalLabel
                  label='Reporter name:'
                  value={values?.customerName}
                  disabled={!isEditMode}
                  name='customerName'
                  onChange={handleChange}
                  showNa
                  error={touched.customerName && Boolean(errors.customerName)}
                  helperText={touched.customerName && errors.customerName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  horizontalLabel
                  required={isEditMode && requiredFields.ticketAssignedTo}
                  showRequiredAfter
                  label='Assigned to:'
                  value={values?.ticketAssignedTo}
                  disabled={!isEditMode}
                  name='ticketAssignedTo'
                  onChange={handleChange}
                  showNa
                  error={touched.ticketAssignedTo && Boolean(errors.ticketAssignedTo)}
                  helperText={touched.ticketAssignedTo && errors.ticketAssignedTo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required={isEditMode && requiredFields.ticketSubject}
                  showRequiredAfter
                  horizontalLabel
                  label='Subject:'
                  value={values?.ticketSubject}
                  disabled={!isEditMode}
                  name='ticketSubject'
                  onChange={handleChange}
                  showNa
                  error={touched.ticketSubject && Boolean(errors.ticketSubject)}
                  helperText={touched.ticketSubject && errors.ticketSubject}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required={isEditMode && requiredFields.ticketDescription}
                  showRequiredAfter
                  horizontalLabel
                  label='Description:'
                  value={values?.ticketDescription}
                  disabled={!isEditMode}
                  name='ticketDescription'
                  onChange={handleChange}
                  showNa
                  error={touched.ticketDescription && Boolean(errors.ticketDescription)}
                  helperText={touched.ticketDescription && errors.ticketDescription}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required={isEditMode && requiredFields.ticketNotes}
                  showRequiredAfter
                  horizontalLabel
                  label='Notes:'
                  value={values?.ticketNotes}
                  disabled={!isEditMode}
                  name='ticketNotes'
                  onChange={handleChange}
                  showNa
                  error={touched.ticketNotes && Boolean(errors.ticketNotes)}
                  helperText={touched.ticketNotes && errors.ticketNotes}
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
