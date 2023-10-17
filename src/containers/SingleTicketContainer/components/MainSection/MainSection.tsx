import { Grid } from '@mui/material';
import { isEqual } from 'lodash-es';

import { ISingleTicket, ISingleTicketForm } from 'models/Ticket';
import { toggleEditMode, useTicketSelector } from 'reducers/ticket-reducer';
import { useFormik } from 'formik';

import { TextInput } from 'components/common/TextInput';

import { SingleBox } from '../SingleBox';

import * as S from './styled';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch } from 'hooks/store-hook';
import { validationSchema, initialFormValues, requiredFields } from './constants';
import { clearSelection, setIsValid, setSelectedButton, useNavigationButtonsSelector } from 'reducers/navigationButtons-reducer';
import { EOption, EPageType } from 'reducers/location-reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertMessages } from 'components/common/PopupAlert';
import { showAlertPopup } from 'reducers/popup-alert-reducer';
import { useCreateSingleTicketMutation, useUpdateSingleTicketMutation } from 'services/tickets';
import { AlertVariants } from 'components/common/PopupAlert/constants';
import { constantClientId, constantUserId } from '../../../../constants';
import { Select } from 'components/common/Select';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from 'utils/constants';

interface IProps {
  data?: ISingleTicket | null;
  createNewMode?: boolean;
}

export const MainSection = ({ data, createNewMode }: IProps) => {
  const { id } = useParams();
  const [updateSingleTicket, { isSuccess, error }] = useUpdateSingleTicketMutation();
  const [createSingleTicket, { isSuccess: isCreateSuccess, error: isCreateError }] = useCreateSingleTicketMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isEditMode } = useTicketSelector();
  const { selectedButton } = useNavigationButtonsSelector();

  useEffect(() => {
    return () => {
      dispatch(toggleEditMode({ editMode: false }));
    };
  }, []);

  const onSubmit = useCallback(
    (data: ISingleTicketForm) => {
      const sendData = {
        id: createNewMode ? null : data.id,
        title: data.title,
        description: data.description,
        client: data.client.id || constantClientId,
        userId: data.userId || constantUserId,
        state: data.state.key || 'NEW',
        priority: data.priority.key,
        notes: data.notes,
      };
      createNewMode ? createSingleTicket(sendData) : updateSingleTicket(sendData);
      console.log(data, 'data');
    },
    [createNewMode, createSingleTicket, updateSingleTicket],
  );

  const formik = useFormik({
    validationSchema,
    initialValues: data
      ? {
          ...data,
          priority: {
            key: data.priority,
            value: data.priority,
          },
          state: {
            key: data.state,
            value: data.state,
          },
        }
      : initialFormValues,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  const { values, errors, touched, isValid, initialValues, handleChange, resetForm, validateForm, setFieldValue } = formik;

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
    if (isEditMode || createNewMode) {
      dispatch(setIsValid({ isValid: !isEqualToInitial && isValid }));
    }
  }, [createNewMode, dispatch, errors, isEditMode, isEqualToInitial, isValid, values]);

  useEffect(() => {
    if (selectedButton === EOption.Save && isValid) {
      dispatch(clearSelection());
      onSubmit(values);
    }

    if (selectedButton === EOption.Cancel) {
      dispatch(clearSelection());
      dispatch(toggleEditMode({ editMode: false }));
      resetForm();
      createNewMode && navigate(`/${EPageType.TICKETS}`);
    }
  }, [createNewMode, dispatch, isValid, navigate, onSubmit, resetForm, selectedButton, values]);

  useEffect(() => {
    if (isSuccess || isCreateSuccess) {
      dispatch(setSelectedButton({ selectedButton: EOption.Cancel }));
      dispatch(showAlertPopup({ variant: AlertVariants.SUCCESS, message: isCreateSuccess ? AlertMessages.TICKET_CREATED : AlertMessages.UPDATED }));
      dispatch(toggleEditMode({ editMode: false }));
    }
    if (error || isCreateError) {
      dispatch(clearSelection());
      validateForm();
    }
  }, [isSuccess, error, validateForm, dispatch, isCreateSuccess, isCreateError]);

  console.log(errors, 'err', isEditMode, values, id);

  const getOptionLabel = (option) => option?.value ?? '';
  const isOptionEqualToValue = (option1, option2) => option1?.value === option2?.value;

  const isDisabled = createNewMode ? !createNewMode : !isEditMode;

  return (
    <S.Wrapper>
      <Grid item sx={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <Grid mt={2}>
          <SingleBox title={''} width={12} noBorder>
            <Grid container item rowSpacing={1} columnSpacing={4}>
              {/* <Grid item xs={12}>
              <TextInput
                  required={(isEditMode || createNewMode) && requiredFields.customerName}
                  showRequiredAfter
                  horizontalLabel
                  label='Reporter name:'
                  value={values?.customerName}
                  disabled={isDisabled}
                  name='customerName'
                  onChange={handleChange}
                  showNa
                  error={touched.customerName && Boolean(errors.customerName)}
                  helperText={touched.customerName && errors.customerName}
                />
              </Grid> */}
              {/* {!createNewMode && (
                <Grid item xs={12}>
                  <TextInput
                    horizontalLabel
                    required={(isEditMode || createNewMode) && requiredFields.ticketAssignedTo}
                    showRequiredAfter
                    label='Assigned to:'
                    value={values?.ticketAssignedTo}
                    disabled={isDisabled}
                    name='ticketAssignedTo'
                    onChange={handleChange}
                    showNa
                    error={touched.ticketAssignedTo && Boolean(errors.ticketAssignedTo)}
                    helperText={touched.ticketAssignedTo && errors.ticketAssignedTo}
                  />
                </Grid>
              )} */}
              <Grid item xs={12}>
                <TextInput
                  required={(isEditMode || createNewMode) && requiredFields.title}
                  showRequiredAfter
                  horizontalLabel
                  label='Title:'
                  value={values?.title}
                  disabled={isDisabled}
                  name='title'
                  onChange={handleChange}
                  showNa
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required={(isEditMode || createNewMode) && requiredFields.description}
                  showRequiredAfter
                  horizontalLabel
                  label='Description:'
                  value={values?.description}
                  disabled={isDisabled}
                  name='description'
                  onChange={handleChange}
                  showNa
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required={(isEditMode || createNewMode) && requiredFields.notes}
                  showRequiredAfter
                  horizontalLabel
                  label='Notes:'
                  value={values?.notes}
                  disabled={isDisabled}
                  name='notes'
                  onChange={handleChange}
                  showNa
                  error={touched.notes && Boolean(errors.notes)}
                  helperText={touched.notes && errors.notes}
                  multiline
                />
              </Grid>
              {(createNewMode || isEditMode) && (
                <Grid item xs={12}>
                  <Select
                    required={(isEditMode || createNewMode) && requiredFields.priority}
                    label='Priority:'
                    placeholder='Select from the list'
                    size={'small'}
                    name={'roles'}
                    options={PRIORITY_OPTIONS}
                    showRequiredAfter
                    value={values?.priority}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    horizontalLabel
                    disabled={isDisabled}
                    onChange={(data) => setFieldValue('priority', data)}
                    error={touched.priority && Boolean(errors.priority)}
                    // helperText={touched.priority && errors.priority}
                  />
                </Grid>
              )}
              {(createNewMode || isEditMode) && (
                <Grid item xs={12}>
                  <Select
                    required={(isEditMode || createNewMode) && requiredFields.state}
                    label='State:'
                    placeholder='Select from the list'
                    size={'small'}
                    name={'roles'}
                    options={STATUS_OPTIONS}
                    showRequiredAfter
                    value={values?.state}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    horizontalLabel
                    disabled={createNewMode ? true : isDisabled}
                    onChange={(data) => setFieldValue('state', data)}
                    error={touched.state && Boolean(errors.state)}
                    // helperText={touched.state && errors.state}
                  />
                </Grid>
              )}
            </Grid>
          </SingleBox>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};
