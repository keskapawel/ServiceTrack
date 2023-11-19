import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { TChangePasswordRequest, useChangePasswordMutation } from 'services/auth';
import { initialFormValues, requiredFields, validationSchema } from './constants';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { TextInput } from 'components/common/TextInput';
import { SingleBox } from 'containers/SingleUserContainer/components/SingleBox';
import * as S from './styled';
import { Button } from 'components/common/Button';
import { AlertVariants, AlertMessages } from 'components/common/PopupAlert';
import { clearSelection } from 'reducers/navigationButtons-reducer';
import { showAlertPopup } from 'reducers/popup-alert-reducer';

export const ChangePasswordContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [changePassword, { isSuccess, error, data }] = useChangePasswordMutation();

  const onSubmit = useCallback(
    (submitData: TChangePasswordRequest) => {
      changePassword(submitData);
    },
    [changePassword],
  );

  const formik = useFormik({
    validationSchema,
    initialValues: initialFormValues,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  const { values, errors, touched, isValid, submitForm, handleChange, resetForm, validateForm, setFieldValue, handleBlur } = formik;

  useEffect(() => {
    validateForm();
    return () => {
      resetForm();
    };
  }, [resetForm, validateForm]);

  useEffect(() => {
    if (isSuccess && data?.status !== 'EXPECTATION_FAILED') {
      dispatch(showAlertPopup({ variant: AlertVariants.SUCCESS, message: AlertMessages.PASSWORD_CHANGED }));
      navigate(-1);
    }
    if (error || data?.status === 'EXPECTATION_FAILED') {
      dispatch(clearSelection());
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
      validateForm();
    }
  }, [isSuccess, error, validateForm, dispatch, navigate, data?.status]);

  return (
    <>
      <S.Wrapper>
        <Grid item sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Grid mt={2}>
            <SingleBox title={''} width={12} noBorder>
              <Grid container item rowSpacing={1} columnSpacing={4}>
                <Grid container item xs={12} lg={6} rowSpacing={2} columnSpacing={4}>
                  <Grid item xs={12}>
                    <TextInput
                      required={requiredFields.password}
                      showRequiredAfter
                      type={values.showPassword ? 'text' : 'password'}
                      label='Old password:'
                      value={values?.password}
                      name='password'
                      onChange={handleChange}
                      showNa
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      required={requiredFields.newPassword}
                      showRequiredAfter
                      type={values.showPassword ? 'text' : 'password'}
                      label='New password:'
                      value={values?.newPassword}
                      name='newPassword'
                      onChange={handleChange}
                      showNa
                      onBlur={handleBlur}
                      error={touched.newPassword && Boolean(errors.newPassword)}
                      helperText={touched.newPassword && errors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      required={requiredFields.newPasswordConfirmation}
                      showRequiredAfter
                      label='Confirm new password:'
                      value={values?.newPasswordConfirmation}
                      name='newPasswordConfirmation'
                      onChange={handleChange}
                      id='outlined-password-input'
                      type={values.showPassword ? 'text' : 'password'}
                      onBlur={handleBlur}
                      error={touched.newPasswordConfirmation && Boolean(errors.newPasswordConfirmation)}
                      helperText={touched.newPasswordConfirmation && errors.newPasswordConfirmation}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item mt={1}>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked value={values.showPassword} onChange={() => setFieldValue('showPassword', !values.showPassword)} />
                  }
                  label='Hide password'
                />
              </Grid>
              <Grid item mt={2}>
                <Button type={'submit'} onClick={submitForm} disabled={!isValid}>
                  Save new password
                </Button>
              </Grid>
            </SingleBox>
          </Grid>
        </Grid>
      </S.Wrapper>
    </>
  );
};
