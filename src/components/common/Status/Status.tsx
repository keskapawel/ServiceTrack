import { palette } from 'styles/palette';
import { Tooltip } from '../Tooltip';
import { StatusesList, Colors } from './model';

import { Select } from '../Select';
import { IKeyValue } from 'models/Key_Value';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { EPageType } from 'reducers/location-reducer';
import { useUpdateSingleTicketMutation } from 'services/tickets';
import { EFieldType } from './constants';
import { showAlertPopup } from 'reducers/popup-alert-reducer';
import { AlertVariants, AlertMessages } from '../PopupAlert';
import { useDispatch } from 'react-redux';

import * as S from './styled';

interface IProps {
  status: string;
  subTitle?: string;
  changeEnable?: boolean;
  options?: IKeyValue[];
  changableId?: string;
  type?: EPageType;
  field?: EFieldType | string;
  onClick?: () => void;
}

export const Status = ({ status, subTitle, changeEnable, options, changableId, type, field, onClick }: IProps) => {
  if (changeEnable)
    return <ChangableStatus status={status} options={options} subTitle={subTitle} changableId={changableId} field={field} type={type} />;
  if (subTitle) return <StatusWitTooltip status={status} subTitle={subTitle} onClick={onClick} />;
  return <StatusWithoutTooltip status={status} onClick={onClick} />;
};

const StatusWithoutTooltip = ({ status, onClick }: IProps) => {
  return (
    <S.Wrapper onClick={onClick}>
      <S.Title
        $background={Colors[StatusesList[status.toLowerCase()]]?.[1] ?? palette.grayBackLight}
        $color={Colors[StatusesList[status.toLowerCase()]]?.[0] ?? palette.baseColor}
      >
        {StatusesList[status]?.toUpperCase() ?? status}
      </S.Title>
    </S.Wrapper>
  );
};

const StatusWitTooltip = ({ status, subTitle, onClick }: IProps) => (
  <S.Wrapper onClick={onClick}>
    <Tooltip title={subTitle} placement='top'>
      <S.Title
        $background={Colors[StatusesList[status.toLowerCase()]]?.[1] ?? palette.grayBackLight}
        $color={Colors[StatusesList[status.toLowerCase()]]?.[0] ?? palette.baseColor}
      >
        {StatusesList[status]?.toUpperCase() ?? status}
        {subTitle && <S.ToolTipBox $color={Colors[StatusesList[status.toLowerCase()]]?.[0] ?? palette.baseColor}>&#x2022;</S.ToolTipBox>}
      </S.Title>
    </Tooltip>
  </S.Wrapper>
);

const ChangableStatus = ({ status, options, subTitle, changableId, type, field = '' }: IProps) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [updateSingleTicket, { isSuccess: isUpdateTicketSuccess, isError: isUpdateTicketError }] = useUpdateSingleTicketMutation();

  useEffect(() => {
    if (isUpdateTicketSuccess) {
      dispatch(showAlertPopup({ variant: AlertVariants.SUCCESS, message: AlertMessages.UPDATED }));
    }
    if (isUpdateTicketError) {
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
    }
  }, [dispatch, isUpdateTicketSuccess, isUpdateTicketError]);

  const getOptionLabel = (option) => option?.value ?? '';
  const isOptionEqualToValue = (option1, option2) => option1?.value === option2?.value;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = useCallback((_: unknown) => {}, []);

  const formik = useFormik({
    initialValues: field ? { [field]: { key: status, value: status } } : { [field]: { key: '', value: '' } },
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  const { values, setFieldValue } = formik;

  const handleChange = (data) => {
    setFieldValue('status', data);

    setIsOpen(false);

    if (type === EPageType.TICKETS) {
      updateSingleTicket({
        note: null,
        state: null,
        priority: null,
        title: null,
        description: null,
        id: changableId ?? '',
        [field]: data.value,
      });
    }
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Status status={status} subTitle={subTitle} onClick={handleClick} />
      <S.ChangableWrapper>
        <Select
          hideSelect
          disableClearable
          hideLabel
          name={'status'}
          fullWidth
          open={isOpen}
          onChange={handleChange}
          value={values[field]}
          options={options ?? []}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
        />
      </S.ChangableWrapper>
    </>
  );
};
