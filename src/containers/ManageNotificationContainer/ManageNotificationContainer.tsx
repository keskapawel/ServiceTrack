import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useUpdateNotificationsSettingsMutation } from 'services/auth';
import { EFIELD } from './constants';
import { Grid } from '@mui/material';
import { SingleBox } from 'containers/SingleUserContainer/components/SingleBox';
import * as S from './styled';
import { Button } from 'components/common/Button';
import { AlertVariants, AlertMessages } from 'components/common/PopupAlert';
import { clearSelection } from 'reducers/navigationButtons-reducer';
import { showAlertPopup } from 'reducers/popup-alert-reducer';
import { Select } from 'components/common/Select';
import { YES_NO_SELECT_OPTIONS } from 'utils/constants';
import { Loader } from 'components/common/Loader';
import { ISingleNotification } from 'models/UserNotificationList';

interface IProps {
  data: ISingleNotification[];
  isLoading?: boolean;
}

export const ManageNotificationContainer = ({ data, isLoading }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [updateNotificationsSettings, { isSuccess, error }] = useUpdateNotificationsSettingsMutation();

  const onSubmit = useCallback(
    (submitData) => {
      const sendData = [
        {
          id: data?.find((item) => item.type === EFIELD.ASSIGNED)?.uuid ?? '',
          email: submitData.assignedToEmail,
          app: submitData.assignedToApp,
        },
        {
          id: data?.find((item) => item.type === EFIELD.TITLE)?.uuid ?? '',
          email: submitData.titleEmail,
          app: submitData.titleApp,
        },
        {
          id: data?.find((item) => item.type === EFIELD.DESCRIPTION)?.uuid ?? '',
          email: submitData.descriptionEmail,
          app: submitData.descriptionApp,
        },
        {
          id: data?.find((item) => item.type === EFIELD.NOTE)?.uuid ?? '',
          email: submitData.NoteEmail,
          app: submitData.NoteApp,
        },
        {
          id: data?.find((item) => item.type === EFIELD.STATE)?.uuid ?? '',
          email: submitData.stateEmail,
          app: submitData.stateApp,
        },
        {
          id: data?.find((item) => item.type === EFIELD.PRIORITY)?.uuid ?? '',
          email: submitData.priorityMail,
          app: submitData.priorityApp,
        },
        {
          id: data?.find((item) => item.type === EFIELD.ADD_COMMENT)?.uuid ?? '',
          email: submitData.newCommentEmail,
          app: submitData.newCommentApp,
        },
        {
          id: data?.find((item) => item.type === EFIELD.ATTACHMENTS)?.uuid ?? '',
          email: submitData.attachmentsEmail,
          app: submitData.attachmentsApp,
        },
      ];

      updateNotificationsSettings(sendData);
    },
    [data, updateNotificationsSettings],
  );

  const formik = useFormik({
    initialValues: {
      assignedToEmail: data?.find((item) => item.type === EFIELD.ASSIGNED)?.email ?? false,
      assignedToApp: data?.find((item) => item.type === EFIELD.ASSIGNED)?.app ?? false,
      titleEmail: data?.find((item) => item.type === EFIELD.TITLE)?.email ?? false,
      titleApp: data?.find((item) => item.type === EFIELD.TITLE)?.app ?? false,
      descriptionEmail: data?.find((item) => item.type === EFIELD.DESCRIPTION)?.email ?? false,
      descriptionApp: data?.find((item) => item.type === EFIELD.DESCRIPTION)?.app ?? false,
      NoteEmail: data?.find((item) => item.type === EFIELD.NOTE)?.email ?? false,
      NoteApp: data?.find((item) => item.type === EFIELD.NOTE)?.app ?? false,
      stateEmail: data?.find((item) => item.type === EFIELD.STATE)?.email ?? false,
      stateApp: data?.find((item) => item.type === EFIELD.STATE)?.app ?? false,
      priorityMail: data?.find((item) => item.type === EFIELD.PRIORITY)?.email ?? false,
      priorityApp: data?.find((item) => item.type === EFIELD.PRIORITY)?.app ?? false,
      newCommentEmail: data?.find((item) => item.type === EFIELD.ADD_COMMENT)?.email ?? false,
      newCommentApp: data?.find((item) => item.type === EFIELD.ADD_COMMENT)?.app ?? false,
      attachmentsEmail: data?.find((item) => item.type === EFIELD.ATTACHMENTS)?.email ?? false,
      attachmentsApp: data?.find((item) => item.type === EFIELD.ATTACHMENTS)?.app ?? false,
    },
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  const { values, isValid, submitForm, resetForm, validateForm, setFieldValue } = formik;

  useEffect(() => {
    validateForm();
    return () => {
      resetForm();
    };
  }, [resetForm, validateForm]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(showAlertPopup({ variant: AlertVariants.SUCCESS, message: AlertMessages.SAVED }));
    }
    if (error) {
      dispatch(clearSelection());
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
      validateForm();
    }
  }, [isSuccess, error, validateForm, dispatch, navigate]);

  const getOptionLabel = (option) => option?.name ?? '';
  const isOptionEqualToValue = (option1, option2) => option1?.value === option2?.value;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <S.Wrapper>
          <Grid item sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Grid mt={4}>
              <S.Header>Ticket notifications</S.Header>
              <SingleBox title={''} width={12} specificPadding='30px'>
                <S.SecionHeader>Assigned to changed</S.SecionHeader>
                <Grid container item rowSpacing={1} columnSpacing={4}>
                  <Grid container item xs={12} lg={12} rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='Email:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.assignedToEmail)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('assignedToEmail', data?.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='In-app notification:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.assignedToApp)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('assignedToApp', data?.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </SingleBox>
              <SingleBox title={''} width={12}>
                <S.SecionHeader>Title changed</S.SecionHeader>
                <Grid container item rowSpacing={1} columnSpacing={4}>
                  <Grid container item xs={12} lg={12} rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='Email:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.titleEmail)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('titleEmail', data?.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='In-app notification:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.titleApp)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('titleApp', data?.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </SingleBox>
              <SingleBox title={''} width={12}>
                <S.SecionHeader>Description changed</S.SecionHeader>
                <Grid container item rowSpacing={1} columnSpacing={4}>
                  <Grid container item xs={12} lg={12} rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='Email:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.descriptionEmail)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('descriptionEmail', data?.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='In-app notification:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.descriptionApp)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('descriptionApp', data?.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </SingleBox>
              <SingleBox title={''} width={12}>
                <S.SecionHeader>Note changed</S.SecionHeader>
                <Grid container item rowSpacing={1} columnSpacing={4}>
                  <Grid container item xs={12} lg={12} rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='Email:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.NoteEmail)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('NoteEmail', data?.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='In-app notification:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.NoteApp)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('NoteApp', data?.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </SingleBox>
              <SingleBox title={''} width={12}>
                <S.SecionHeader>State changed</S.SecionHeader>
                <Grid container item rowSpacing={1} columnSpacing={4}>
                  <Grid container item xs={12} lg={12} rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='Email:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.stateEmail)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('stateEmail', data?.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='In-app notification:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.stateApp)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('stateApp', data?.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </SingleBox>
              <SingleBox title={''} width={12}>
                <S.SecionHeader>Priority changed</S.SecionHeader>
                <Grid container item rowSpacing={1} columnSpacing={4}>
                  <Grid container item xs={12} lg={12} rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='Email:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.priorityMail)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('priorityMail', data?.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='In-app notification:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.priorityApp)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('priorityApp', data?.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </SingleBox>
              <SingleBox title={''} width={12}>
                <S.SecionHeader>New comment added</S.SecionHeader>
                <Grid container item rowSpacing={1} columnSpacing={4}>
                  <Grid container item xs={12} lg={12} rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='Email:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.newCommentEmail)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('newCommentEmail', data?.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='In-app notification:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.newCommentApp)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('newCommentApp', data?.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </SingleBox>
              <SingleBox title={''} width={12}>
                <S.SecionHeader>Attachments list changed</S.SecionHeader>
                <Grid container item rowSpacing={1} columnSpacing={4}>
                  <Grid container item xs={12} lg={12} rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='Email:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.attachmentsEmail)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('attachmentsEmail', data?.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        required
                        label='In-app notification:'
                        disableClearable
                        placeholder='Select from the list'
                        size={'small'}
                        name={'assigned'}
                        options={YES_NO_SELECT_OPTIONS}
                        showRequiredAfter
                        value={YES_NO_SELECT_OPTIONS.find((item) => item.value === values.attachmentsApp)}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        horizontalLabel
                        onChange={(data) => {
                          setFieldValue('attachmentsApp', data?.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </SingleBox>
              <Grid item mt={3} mb={3}>
                <Button type={'submit'} onClick={submitForm} disabled={!isValid}>
                  Save settings
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </S.Wrapper>
      )}
    </>
  );
};
