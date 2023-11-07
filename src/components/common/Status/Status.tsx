import { palette } from 'styles/palette';
import { Tooltip } from '../Tooltip';
import { StatusesList, Colors } from './model';

import * as S from './styled';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { STATUS_OPTIONS } from 'utils/constants';
import { Select } from '../Select';

interface IProps {
  status: string;
  subTitle?: string;
  changeEnable?: boolean;
}

export const Status = ({ status, subTitle, changeEnable }: IProps) => {
  if (changeEnable) return <ChangableStatus status={status} />;
  if (subTitle) return <StatusWitTooltip status={status} subTitle={subTitle} />;
  return <StatusWithoutTooltip status={status} />;
};

const StatusWithoutTooltip = ({ status }: IProps) => {
  return (
    <S.Wrapper>
      <S.Title
        $background={Colors[StatusesList[status.toLowerCase()]]?.[1] ?? palette.grayBackLight}
        $color={Colors[StatusesList[status.toLowerCase()]]?.[0] ?? palette.baseColor}
      >
        {StatusesList[status]?.toUpperCase() ?? status}
      </S.Title>
    </S.Wrapper>
  );
};

const StatusWitTooltip = ({ status, subTitle }: IProps) => (
  <S.Wrapper>
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

const ChangableStatus = ({ status }: IProps) => {
  const getOptionLabel = (option) => option?.value ?? '';
  const isOptionEqualToValue = (option1, option2) => option1?.value === option2?.value;

  const handleChange = (d) => {
    d.preventDefault();
    d.stopPropagation();
  };
  return (
    <>
      <StatusWithoutTooltip status={status} />
      <S.ChangableWrapper>
        {/* <ToggleButtonGroup color='primary' value={'XD'} exclusive onChange={handleChange} aria-label='Platform'>
          {STATUS_OPTIONS.map((status, index) => {
            return (
              <ToggleButton key={`${index}_${status.key}`} value={status.value}>
                <StatusWithoutTooltip status={status.value} />
              </ToggleButton>
            );
          })}
          {/* <ToggleButton value='web'>Web</ToggleButton>
        <ToggleButton value='android'>Android</ToggleButton>
      <ToggleButton value='ios'>iOS</ToggleButton> */}
        {/* </ToggleButtonGroup> */}

        <Select onOpen={handleChange} options={STATUS_OPTIONS} getOptionLabel={getOptionLabel} isOptionEqualToValue={isOptionEqualToValue} />
      </S.ChangableWrapper>
    </>
  );
};
