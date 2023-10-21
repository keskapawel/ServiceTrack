import { useCallback } from 'react';
import dayjs from 'dayjs';

import { TextInput } from 'components/common/TextInput';
import { Typography } from 'components/common/Typography';
import { FileUploadInput } from 'components/common/FileUploadInput';

import { formatDate } from 'utils/common';

import { palette } from 'styles/palette';
import { addDocumentRequiredFields } from './constants';
import * as S from './styled';

interface IProps {
  formik;
  subTitle: string;
  note?: string;
}

export const Document = ({ formik, subTitle, note }: IProps) => {
  const { values, errors, touched, handleChange, setFieldValue, handleBlur, setFieldTouched } = formik;

  console.log(values, 'valuesXDD');

  const handleDocumentChange = useCallback(
    (file?: File) => {
      console.log(file, 'file');
      setFieldValue('documentFileName', file?.name);
      setFieldValue('file', file);
    },
    [setFieldValue],
  );

  return (
    <S.AddDocumentWrapper>
      <Typography align={'center'}>{subTitle}</Typography>
      {note && (
        <S.StyledAlertComponent severity={'info'} variant={'standard'}>
          {note}
        </S.StyledAlertComponent>
      )}
      <Typography color={palette.alert} component='p' pt='24px'>
        * Required fields
      </Typography>
      <form>
        <S.Row>
          <S.SingleItem>
            <TextInput
              required={addDocumentRequiredFields?.description}
              label='Document description'
              size={'small'}
              name='description'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
          </S.SingleItem>
        </S.Row>
        <S.DocumentFileRow>
          <S.SingleItem>
            <FileUploadInput
              required={addDocumentRequiredFields?.file}
              label='Document file'
              onDrop={handleDocumentChange}
              initialValue={values?.file}
            />
          </S.SingleItem>
        </S.DocumentFileRow>
      </form>
    </S.AddDocumentWrapper>
  );
};
