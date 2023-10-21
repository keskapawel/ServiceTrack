import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { Accept, ErrorCode, FileError, FileRejection, useDropzone } from 'react-dropzone';
import { Grid } from '@mui/material';

import { IApiFile } from 'models/File';
import { bytesToMegaBytes } from 'services/utils';

import { Icon } from 'components/common/Icon';
import { TextInput } from 'components/common/TextInput';
import { Typography } from 'components/common/Typography';

import { palette } from 'styles/palette';
import * as S from './styled';
import { defaultFileMaxSize } from './constants';
import { apiFileToFile } from './utils';

export type FileUploadInputType = {
  onDrop?: (file?: File) => void;
  onError?: (errorCode: FileError[]) => void;
  maxSize?: number;
  disabled?: boolean;
  label?: string;
  accept?: Accept;
  initialValue?: IApiFile | File;
  required?: boolean;
};

export const FileUploadInput = ({
  onDrop,
  onError,
  disabled,
  maxSize = defaultFileMaxSize,
  label = '',
  initialValue,
  accept,
  required,
}: FileUploadInputType) => {
  const [errors, setErrors] = useState('');
  const [selectedFile, setSelectedFile] = useState<{ data?: File }>({
    data: apiFileToFile(initialValue),
  });

  useEffect(() => {
    setSelectedFile({
      data: apiFileToFile(initialValue),
    });
  }, [initialValue]);

  const handleDrop = useCallback(
    (files: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles?.length === 1) {
        rejectedFiles?.[0].errors.map((error) => {
          if (error.code === ErrorCode.FileTooLarge) {
            setErrors(`Error: File is larger than ${bytesToMegaBytes(maxSize)}MB`);
          }

          if (error.code === ErrorCode.FileInvalidType) {
            setErrors(`Error: ${error.message}`);
          }

          if (typeof onError === 'function') onError([error]);
        });
      }
      if (files?.length === 1) {
        if (typeof onDrop === 'function') onDrop(files?.[0]);
        setErrors('');
        setSelectedFile({ data: files?.[0] });
      }
    },
    [maxSize, onDrop, onError],
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept,
    maxSize,
    noClick: disabled,
    useFsAccessApi: false,
  });

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      open();
    },
    [open],
  );

  const handleRemove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDrop?.(undefined);
      setSelectedFile({ data: undefined });
    },
    [onDrop],
  );

  return (
    <>
      <S.DropZoneWrapper {...getRootProps()} $isDragActive={isDragActive} tabIndex={-1}>
        <S.DropZoneContainer {...getRootProps({ className: 'dropzone' })} tabIndex={-1}>
          <input {...getInputProps()} />
          <S.UploadInputContainer container sx={{ justifyContent: 'space-between' }} $hide={isDragActive}>
            <Grid item xs={9} onClick={(e) => e.stopPropagation()}>
              <TextInput
                required={required}
                label={label}
                size={'small'}
                placeholder={disabled ? 'No file uploaded' : `Drag & Drop file or Upload manually (max ${bytesToMegaBytes(maxSize)}MB)`}
                name='name'
                value={selectedFile.data?.name}
                disabled
              />
            </Grid>
            <Grid item xs={3} textAlign='right' display='flex' justifyContent='end' alignItems='end'>
              {selectedFile.data ? (
                <S.UploadButton variant='outlined' startIcon={<Icon icon='TrashIcon' />} onClick={handleRemove} disabled={disabled}>
                  <Typography>Delete</Typography>
                </S.UploadButton>
              ) : (
                <S.UploadButton variant='outlined' startIcon={<Icon icon='UploadIcon' />} onClick={handleClick} disabled={disabled}>
                  <Typography>Upload</Typography>
                </S.UploadButton>
              )}
            </Grid>
            {errors && <Typography color={palette.alert}>{errors}</Typography>}
          </S.UploadInputContainer>
          {isDragActive && (
            <S.DropTextContainer>
              <Typography>Drop file here</Typography>
            </S.DropTextContainer>
          )}
        </S.DropZoneContainer>
      </S.DropZoneWrapper>
    </>
  );
};
