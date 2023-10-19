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
import { ISIngleUser, ISingleUserForm } from 'models/User';
import { useChangeUserStateMutation, useCreateSingleUserMutation, useUpdateSingleUserMutation } from 'services/users';
import { toggleEditMode, useUserSelector } from 'reducers/user-reducer';
import { MODULES_OPTIONS, YES_NO_SELECT_OPTIONS } from 'utils/constants';
import { Select } from 'components/common/Select';
import { IKeyValue } from 'models/Key_Value';

interface IProps {
  data?: ISIngleUser;
  createNewMode?: boolean;
}

export const MainSection = ({ data, createNewMode }: IProps) => {
  const [updateSingleUser, { isSuccess, error }] = useUpdateSingleUserMutation();
  const [createSingleUser, { isSuccess: isCreateSuccess, error: isCreateError }] = useCreateSingleUserMutation();
  const [changeUserState] = useChangeUserStateMutation();
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
    (submitData: ISingleUserForm) => {
      createNewMode ? createSingleUser(submitData) : updateSingleUser(submitData);
      if (submitData.isEnabled !== data?.isEnabled) {
        changeUserState({ id: submitData.id });
      }

      // if (submitData.isExpired !== data?.isExpired) {
      // }
    },
    [changeUserState, createNewMode, createSingleUser, data?.isEnabled, updateSingleUser],
  );

  const userRoles = Array.from(new Set(data?.rules?.flatMap((item) => item?.name)))?.map((item) => ({
    key: item,
    value: item,
  }));

  const formik = useFormik({
    validationSchema,
    initialValues: data ? { ...data, rules: userRoles } : initialFormValues,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  const { values, errors, touched, isValid, initialValues, handleChange, resetForm, validateForm, setFieldValue, handleBlur } = formik;

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

  const getOptionLabel = (option) => option?.name ?? option?.value ?? '';
  const isOptionEqualToValue = (option1, option2) => option1?.name === option2?.name || option1?.value === option2?.value;

  const handleRolesChange = (data) => {
    setFieldValue('rules', data);
  };

  return (
    <S.Wrapper>
      <Grid item sx={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <Grid mt={2}>
          <SingleBox title={''} width={12} noBorder>
            <Grid container item rowSpacing={1} columnSpacing={4}>
              <Grid item xs={12}>
                <TextInput
                  required={isEditMode && requiredFields.userName}
                  showRequiredAfter
                  horizontalLabel
                  label='Name:'
                  value={values?.userName}
                  disabled={isDisabled}
                  name='userName'
                  onChange={handleChange}
                  showNa
                  onBlur={handleBlur}
                  error={touched.userName && Boolean(errors.userName)}
                  // helperText={touched.userName && errors.userName}
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
                  onBlur={handleBlur}
                  error={touched.surname && Boolean(errors.surname)}
                  // helperText={touched.surname && errors.surname}
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
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  // helperText={touched.email && errors.email}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  required={isEditMode && requiredFields.rules}
                  label='Roles:'
                  placeholder='Select from the list'
                  size={'small'}
                  name={'rules'}
                  options={MODULES_OPTIONS}
                  showRequiredAfter
                  value={values.rules}
                  getOptionLabel={getOptionLabel}
                  isOptionEqualToValue={isOptionEqualToValue}
                  horizontalLabel
                  disabled={isDisabled}
                  onChange={handleRolesChange}
                  onBlur={handleBlur}
                  error={touched.rules && Boolean(errors.rules)}
                  // helperText={touched.roles && errors.roles}
                  multiple
                />
              </Grid>
              {isEditMode && (
                <>
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
                      onChange={(data) => {
                        setFieldValue('isEnabled', data?.value);
                      }}
                      onBlur={handleBlur}
                      error={touched.isEnabled && Boolean(errors.isEnabled)}
                      // helperText={touched.isEnabled && errors.isEnabled}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Select
                      required={isEditMode && requiredFields.isExpired}
                      label='Expired:'
                      placeholder='Select from the list'
                      size={'small'}
                      horizontalLabel
                      showRequiredAfter
                      name={'isExpired'}
                      options={YES_NO_SELECT_OPTIONS}
                      value={YES_NO_SELECT_OPTIONS.find((option) => option.value === values.isExpired)}
                      getOptionLabel={getOptionLabel}
                      isOptionEqualToValue={isOptionEqualToValue}
                      disabled={isDisabled}
                      onChange={(data) => {
                        setFieldValue('isExpired', data?.value);
                      }}
                      onBlur={handleBlur}
                      error={touched.isExpired && Boolean(errors.isExpired)}
                      // helperText={touched.isExpired && errors.isExpired}
                    />
                  </Grid> */}
                </>
              )}
            </Grid>
          </SingleBox>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};
