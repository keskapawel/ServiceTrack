import { Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Avatar } from 'components/common/Avatar/Avatar';
import { Button } from 'components/common/Button';
import { Icon } from 'components/common/Icon';
import { TextInput } from 'components/common/TextInput';
import { Typography } from 'components/common/Typography';
import { HiddenLabel } from 'components/common/HiddenLabel';

import { palette } from 'styles/palette';
import * as S from './styled';
import { useRemoveFileMutation, useUploadFileMutation, useUploadFileToNewResourceMutation } from 'services/files';
import { useDispatch } from 'react-redux';
import { AlertVariants, AlertMessages } from 'components/common/PopupAlert';
import { showAlertPopup } from 'reducers/popup-alert-reducer';
import { setSelectedButton } from 'reducers/navigationButtons-reducer';
import { EOption } from 'reducers/location-reducer';

interface IProps {
  data: {
    picture?: string;
    firstName?: string;
    lastName?: string;
    id?: string;
  };
  isEditMode?: boolean;
  formik;
}

export const UserImage = ({ data, isEditMode, formik }: IProps) => {
  const dispatch = useDispatch();
  const { setFieldValue, values, touched } = formik;
  const { picture, firstName, lastName, id } = data;
  const [errors, setErrors] = useState('');
  const [uploadFile, { isSuccess: isUploadSuccess, isError: isUploadError, data: uploadFileData }] = useUploadFileMutation();
  const [uploadFileToNewResource, { isSuccess: isUploadNewSuccess, isError: isUploadNewError, data: uploadNewFileData }] =
    useUploadFileToNewResourceMutation();
  const [removeFile, { isSuccess: isRemoveSuccess, isError: isRemoveError }] = useRemoveFileMutation();

  useEffect(() => {
    if (isUploadSuccess && !isRemoveSuccess && Object.keys(touched).length === 0) {
      dispatch(setSelectedButton({ selectedButton: EOption.Cancel }));
    }
    if (isUploadSuccess || isRemoveSuccess || isUploadNewSuccess) {
      dispatch(
        showAlertPopup({ variant: AlertVariants.SUCCESS, message: isRemoveSuccess ? AlertMessages.IMAGE_REMOVED : AlertMessages.IMAGE_UPLOADED }),
      );
    }
    if (isUploadError || isRemoveError || isUploadNewError) {
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
    }
  }, [dispatch, isRemoveError, isRemoveSuccess, isUploadError, isUploadNewError, isUploadNewSuccess, isUploadSuccess, touched]);

  const [selectedFile, setSelectedFile] = useState({
    data: {
      path: undefined || '',
      name: undefined || '',
      size: undefined || 0,
      type: undefined || '',
      lastModified: undefined || '',
      lastModifiedDate: undefined || new Date(),
      webkitRelativePath: undefined || '',
    },
    preview: undefined || '',
  });

  const onDrop = useCallback(
    (files, rejectedFiles) => {
      if (rejectedFiles?.length === 1) {
        rejectedFiles?.[0].errors.map((error) => {
          if (error.code === 'file-too-large') {
            setErrors(`Error: File is larger than 5 MB`);
          }

          if (error.code === 'file-invalid-type') {
            setErrors(`Error: ${error.message}`);
          }
        });
      }
      if (files?.length === 1) {
        setErrors('');
        setSelectedFile({ data: files?.[0], preview: URL.createObjectURL(files?.[0]) });
        setFieldValue('newFile', files?.[0]);
        setFieldValue('file', URL.createObjectURL(files?.[0]));
      }
    },
    [setFieldValue],
  );

  const handleRemove = useCallback(() => {
    setErrors('');
    setSelectedFile({
      data: {
        path: '',
        name: '',
        size: 0,
        type: '',
        lastModified: '',
        lastModifiedDate: new Date(),
        webkitRelativePath: '',
      },
      preview: '',
    });
    setFieldValue('newFile', null);
    setFieldValue('file', null);
    removeFile({ id: values?.avatar?.uuid });
  }, [removeFile, setFieldValue, values?.avatar?.uuid]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    maxSize: 5242880,
    noClick: !isEditMode,
    useFsAccessApi: false,
  });

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      open();
    },
    [open],
  );

  const handleUploadClick = useCallback(() => {
    values?.uuid
      ? uploadFile({
          id: values?.uuid,
          file: values?.newFile,
        })
      : uploadFileToNewResource({
          file: values?.newFile,
        });
  }, [uploadFile, uploadFileToNewResource, values]);

  useEffect(() => {
    setFieldValue('uploadFileData', uploadFileData?.data.file || uploadNewFileData?.data.file);
  }, [setFieldValue, uploadFileData, uploadNewFileData?.data.file]);

  return (
    <>
      <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={12}>
          <TextInput
            size={'small'}
            placeholder='No file uploaded'
            name='name'
            value={selectedFile?.data?.name || values?.avatar?.name}
            label={'Upload user image'}
            hideLabel
            disabled
          />
        </Grid>
        <Grid item xs={12} textAlign={'right'}>
          {picture ? (
            <Button variant='outlined' startIcon={<Icon icon='TrashIcon' />} onClick={handleRemove} disabled={!isEditMode}>
              <Typography>Delete</Typography>
            </Button>
          ) : (
            <Grid justifyContent={'space-between'} display={'flex'}>
              <Button variant='outlined' startIcon={<Icon icon='UploadIcon' />} onClick={handleClick} disabled={!isEditMode} title='Select file'>
                <Typography>Select File</Typography>
              </Button>
              <Button
                variant='outlined'
                startIcon={<Icon icon='CloudUploadIcon' />}
                onClick={handleUploadClick}
                disabled={!isEditMode}
                title='Upload image'
              >
                <Typography>Upload</Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid container height={'70%'}>
        <S.DropZoneWrapper {...getRootProps()}>
          <S.DropZoneContainer {...getRootProps({ className: 'dropzone' })}>
            <HiddenLabel htmlFor='avatarInput'>Upload user avatar</HiddenLabel>
            <input name='avatarInput' {...getInputProps()} />
            {isDragActive ? (
              <Typography>Drop file here</Typography>
            ) : (
              <>
                <Avatar picture={picture || ''} firstName={firstName ?? ''} lastName={lastName ?? ''} id={id ?? ''} size={120} hideAlt />
                {isEditMode && (
                  <Typography color={palette.lockedTextAndPlaceholder}>
                    Drag profile picture here
                    <br />
                    or use button above
                  </Typography>
                )}
                {errors && <Typography color={palette.alert}>{errors}</Typography>}
              </>
            )}
          </S.DropZoneContainer>
        </S.DropZoneWrapper>
      </Grid>
    </>
  );
};
