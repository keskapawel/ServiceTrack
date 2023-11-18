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
import { RULES_OPTIONS, YES_NO_SELECT_OPTIONS } from 'utils/constants';
import { Select } from 'components/common/Select';
import { UserImage } from '../UserImage';

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

  const userRoles = Array.from(
    new Set(
      data?.rules?.map((item) => ({
        key: item.name.toUpperCase(),
        value: item.name,
        id: item.id,
      })),
    ),
  );

  const onSubmit = useCallback(
    (submitData: ISingleUserForm) => {
      const newSubmitData = {
        id: submitData.uuid,
        email: submitData.email,
        name: submitData.name,
        surname: submitData.surname,
        photoId: submitData?.avatar?.uuid ?? submitData?.uploadFileData?.uuid ?? null,
        rules: submitData?.rules?.map((item) => ({ id: item.id })),
      };

      createNewMode
        ? createSingleUser(newSubmitData)
        : updateSingleUser(newSubmitData).then(() => {
            if (!createNewMode && submitData.enabled !== data?.enabled) {
              changeUserState({ id: submitData.uuid });
            }
          });
    },
    [changeUserState, createNewMode, createSingleUser, data?.enabled, updateSingleUser],
  );

  const formik = useFormik({
    validationSchema,
    initialValues: data ? { ...data, rules: userRoles, uploadFileData: null } : initialFormValues,
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

  const getOptionLabel = (option) => {
    return (option?.name || option?.value) ?? '';
  };
  const isOptionEqualToValue = (option1, option2) => {
    return option1?.name === option2?.name || option1?.value === option2?.value;
  };

  const getMultipleOptionLabel = (value): string => {
    if (value === '') return '';

    return value['key'] as unknown as string;
  };

  const isMultipleOptionEqualToValue = (option, value): boolean => {
    if (value === '') return false;

    return option['key'] === value['key'];
  };

  const handleRolesChange = (data) => {
    setFieldValue('rules', data);
  };

  return (
    <S.Wrapper>
      <Grid item sx={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <Grid mt={2}>
          <SingleBox title={''} width={12} noBorder>
            <Grid container item rowSpacing={1} columnSpacing={4}>
              <Grid container item xs={8} rowSpacing={2} columnSpacing={4}>
                <Grid item xs={12}>
                  <TextInput
                    required={isEditMode && requiredFields.name}
                    showRequiredAfter
                    label='Name:'
                    value={values?.name}
                    disabled={isDisabled}
                    name='name'
                    onChange={handleChange}
                    showNa
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    // helperText={touched.name && errors.name}
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    required={isEditMode && requiredFields.surname}
                    showRequiredAfter
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
                    options={RULES_OPTIONS}
                    showRequiredAfter
                    value={values.rules}
                    getOptionLabel={getMultipleOptionLabel}
                    isOptionEqualToValue={isMultipleOptionEqualToValue}
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
                        required={isEditMode && requiredFields.enabled}
                        label='Enabled:'
                        placeholder='Select from the list'
                        size={'small'}
                        showRequiredAfter
                        name={'enabled'}
                        options={YES_NO_SELECT_OPTIONS}
                        value={YES_NO_SELECT_OPTIONS.find((option) => option.value === values.enabled)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        disabled={isDisabled}
                        onChange={(data) => {
                          setFieldValue('enabled', data?.value);
                        }}
                        onBlur={handleBlur}
                        error={touched.enabled && Boolean(errors.enabled)}
                        // helperText={touched.enabled && errors.enabled}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Grid item xs={4}>
                <UserImage
                  data={{
                    picture: values.avatar?.url || undefined,
                    firstName: values?.userName,
                    lastName: values?.surname,
                    id: values?.uuid,
                  }}
                  isEditMode={isEditMode || createNewMode}
                  formik={formik}
                />
              </Grid>
            </Grid>
          </SingleBox>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};
