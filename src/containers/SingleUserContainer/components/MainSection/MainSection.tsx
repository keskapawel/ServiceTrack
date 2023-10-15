import { Grid } from '@mui/material';
import { isEqual } from 'lodash-es';

import { useFormik } from 'formik';

import { TextInput } from 'components/common/TextInput';

import { SingleBox } from '../SingleBox';

import * as S from './styled';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch } from 'hooks/store-hook';
import { validationSchema, initialFormValues, requiredFields } from './constants';
import { clearSelection, setIsValid, setSelectedButton, useNavigationButtonsSelector } from 'reducers/navigationButtons-reducer';
import { EOption, EPageType } from 'reducers/location-reducer';
import { useNavigate } from 'react-router-dom';
import { AlertMessages } from 'components/common/PopupAlert';
import { showAlertPopup } from 'reducers/popup-alert-reducer';
import { AlertVariants } from 'components/common/PopupAlert/constants';
import { ISIngleUser } from 'models/User';
import { useCreateSingleUserMutation, useUpdateSingleUserMutation } from 'services/users';
import { toggleEditMode, useUserSelector } from 'reducers/user-reducer';
import { MODULES_OPTIONS, YES_NO_SELECT_OPTIONS } from 'utils/constants';
import { Select } from 'components/common/Select';

interface IProps {
  data?: ISIngleUser;
  createNewMode?: boolean;
}

export const MainSection = ({ data, createNewMode }: IProps) => {
  const [updateSingleUser, { isSuccess, error }] = useUpdateSingleUserMutation();
  const [createSingleUser, { isSuccess: isCreateSuccess, error: isCreateError }] = useCreateSingleUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isEditMode } = useUserSelector();
  const { selectedButton } = useNavigationButtonsSelector();

  useEffect(() => {
    return () => {
      dispatch(toggleEditMode({ editMode: false }));
    };
  }, []);

  const onSubmit = useCallback(
    (data: any) => {
      createNewMode ? createSingleUser(data) : updateSingleUser(data);
      console.log(data, 'data');
    },
    [createNewMode, createSingleUser, updateSingleUser],
  );

  const formik = useFormik({
    validationSchema,
    initialValues: data ? data : initialFormValues,
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
  }, [dispatch, errors, createNewMode, isEditMode, isEqualToInitial, isValid, values]);

  useEffect(() => {
    if (selectedButton === EOption.Save && isValid) {
      dispatch(clearSelection());
      onSubmit(values);
    }

    if (selectedButton === EOption.Cancel) {
      dispatch(clearSelection());
      dispatch(toggleEditMode({ editMode: false }));
      resetForm();
      createNewMode && navigate(`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}`);
    }
  }, [createNewMode, dispatch, isValid, navigate, onSubmit, resetForm, selectedButton, values]);

  useEffect(() => {
    if (isSuccess || isCreateSuccess) {
      dispatch(setSelectedButton({ selectedButton: EOption.Cancel }));
      dispatch(
        showAlertPopup({ variant: AlertVariants.SUCCESS, message: isCreateSuccess ? AlertMessages.USER_CREATED : AlertMessages.USER_UPDATED }),
      );
      dispatch(toggleEditMode({ editMode: false }));
    }
    if (error || isCreateError) {
      dispatch(clearSelection());
      validateForm();
    }
  }, [isSuccess, error, validateForm, dispatch, isCreateSuccess, isCreateError]);

  const isDisabled = createNewMode ? !createNewMode : !isEditMode;

  const getOptionLabel = (option) => option?.name ?? '';
  const isOptionEqualToValue = (option1, option2) => option1?.name === option2?.name;

  console.log(values.roles, 'values.roles');

  const userRoles = values.roles[0]?.modules?.map((item) => item.Name);

  const handleRolesChange = (data) => {
    const res = [
      {
        id: '92929ebb-6400-42c7-a235-c59af8e44da6',
        name: 'ADMIN',
        modules: data,
      },
    ];
    setFieldValue('roles', res);
  };

  return (
    <S.Wrapper>
      <Grid item sx={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <Grid mt={2}>
          <SingleBox title={''} width={12} noBorder>
            <Grid container item rowSpacing={1} columnSpacing={4}>
              <Grid item xs={12}>
                <TextInput
                  required={isEditMode && requiredFields.name}
                  showRequiredAfter
                  horizontalLabel
                  label='Name:'
                  value={values?.name}
                  disabled={isDisabled}
                  name='name'
                  onChange={handleChange}
                  showNa
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required={isEditMode && requiredFields.surname}
                  showRequiredAfter
                  horizontalLabel
                  label='Surname:'
                  value={values?.surname}
                  disabled={isDisabled}
                  name='surname'
                  onChange={handleChange}
                  showNa
                  error={touched.surname && Boolean(errors.surname)}
                  helperText={touched.surname && errors.surname}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required={isEditMode && requiredFields.email}
                  showRequiredAfter
                  horizontalLabel
                  label='Email:'
                  value={values?.email}
                  disabled={isDisabled}
                  name='email'
                  onChange={handleChange}
                  showNa
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  required={isEditMode && requiredFields.roles}
                  label='Roles:'
                  placeholder='Select from the list'
                  size={'small'}
                  name={'roles'}
                  options={MODULES_OPTIONS}
                  showRequiredAfter
                  value={MODULES_OPTIONS.filter((option) => userRoles?.includes(option.Name))}
                  getOptionLabel={getOptionLabel}
                  isOptionEqualToValue={isOptionEqualToValue}
                  horizontalLabel
                  disabled={isDisabled}
                  onChange={handleRolesChange}
                  error={touched.roles && Boolean(errors.roles)}
                  // helperText={touched.roles && errors.roles}
                  multiple
                />
              </Grid>
              {isEditMode && (
                <Grid item xs={12}>
                  <Select
                    required={isEditMode && requiredFields.isEnabled}
                    label='Enabled:'
                    placeholder='Select from the list'
                    size={'small'}
                    horizontalLabel
                    showRequiredAfter
                    name={'isEnabled'}
                    options={YES_NO_SELECT_OPTIONS}
                    value={YES_NO_SELECT_OPTIONS.find((option) => option.value === values.isEnabled)}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    disabled={isDisabled}
                    onChange={(data: any) => {
                      setFieldValue('isEnabled', data?.value);
                    }}
                    error={touched.isEnabled && Boolean(errors.isEnabled)}
                    helperText={touched.isEnabled && errors.isEnabled}
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
