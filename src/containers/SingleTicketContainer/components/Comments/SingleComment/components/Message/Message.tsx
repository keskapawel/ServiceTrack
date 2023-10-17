import { Typography } from 'components/common/Typography';

import * as S from './styled';
import { EClassType, EFieldName } from 'models/Activity';

interface IProps {
  newValue: string;
  oldValue: string;
  fieldName: EFieldName;
  $className: EClassType;
}

export const Message = ({ oldValue, newValue, fieldName, $className }: IProps) => {
  return (
    <S.Wrapper>
      {$className === EClassType.COMMENT && <Typography>{newValue}</Typography>}
      {$className === EClassType.TICKET && (
        <>
          <Typography>
            <b>{fieldName}</b> was changed from <b>{oldValue}</b> to <b>{newValue}</b> by user: ADD USER NAME HERE
          </Typography>
        </>
      )}
    </S.Wrapper>
  );
};
