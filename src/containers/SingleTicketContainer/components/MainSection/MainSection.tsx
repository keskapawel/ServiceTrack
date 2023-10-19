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
    (submitData: ISingleTicketForm) => {
      const sendData = {
        id: createNewMode ? null : submitData.id,
        title: submitData.title,
        description: submitData.description,
        client: submitData.client || constantClientId,
        creator: submitData.creator.id || constantUserId,
        assigned: data?.creator.id === submitData.assigned.id ? null : submitData.assigned.id || '31bee528-9f6b-4308-be68-b78093059770',
        state: data?.state === submitData.state?.key ? null : submitData.state?.key || null,
        priority: data?.priority === submitData.priority?.key ? null : submitData.priority?.key || null,
        note: data?.note === submitData.note ? null : submitData.note,
      };
      createNewMode ? createSingleTicket(sendData) : updateSingleTicket(sendData);
    },
    [createNewMode, createSingleTicket, data?.creator.id, data?.note, data?.priority, data?.state, updateSingleTicket],
  );

  const formik = useFormik({
    validationSchema,
    initialValues: data
      ? {
          ...data,
          creatorId: data.creator.id,
          assignedId: data.assigned.id,
          assignedName: `${data?.assigned.name} ${data.assigned.surname}`,
          creatorName: `${data?.creator.name} ${data.creator.surname}`,
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

  const getOptionLabel = (option) => option?.value ?? '';
  const isOptionEqualToValue = (option1, option2) => option1?.value === option2?.value;

  const isDisabled = createNewMode ? !createNewMode : !isEditMode;

  return (
    <S.Wrapper>
      <Grid item sx={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <Grid mt={2}>
          <SingleBox title={''} width={12} noBorder>
            <Grid container item rowSpacing={1} columnSpacing={4}>
              <Grid item xs={12}>
                <TextInput
                  required={(isEditMode || createNewMode) && requiredFields.customerName}
                  showRequiredAfter
                  horizontalLabel
                  label='Reporter name:'
                  value={`${values?.creator.name} ${values.creator.surname}`}
                  disabled
                  name='customerName'
                  onChange={handleChange}
                  showNa
                  error={touched.creatorId && Boolean(errors.creatorId)}
                  helperText={touched.creatorId && errors.creatorId}
                />
              </Grid>
              {!createNewMode && (
                <Grid item xs={12}>
                  <TextInput
                    horizontalLabel
                    required={(isEditMode || createNewMode) && requiredFields.ticketAssignedTo}
                    showRequiredAfter
                    label='Assigned to:'
                    value={values.assignedName}
                    disabled={isDisabled}
                    name='assignedName'
                    onChange={handleChange}
                    showNa
                    error={touched.assignedId && Boolean(errors.assignedId)}
                    helperText={touched.assignedId && errors.assignedId}
                  />
                </Grid>
              )}
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
                  required={(isEditMode || createNewMode) && requiredFields.note}
                  showRequiredAfter
                  horizontalLabel
                  label='Note:'
                  value={values?.note}
                  disabled={isDisabled}
                  name='note'
                  onChange={(event) => setFieldValue('note', event.target.value)}
                  showNa
                  error={touched.note && Boolean(errors.note)}
                  helperText={touched.note && errors.note}
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
