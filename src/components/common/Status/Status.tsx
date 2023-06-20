import { palette } from 'styles/palette';
import { Tooltip } from '../Tooltip';
import { StatusesList, Colors } from './model';

import * as S from './styled';

interface IProps {
  status: string;
  subTitle?: string;
}

export const Status = ({ status, subTitle }: IProps) => {
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

const StatusWitTooltip = ({ status, subTitle }: Required<IProps>) => (
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
