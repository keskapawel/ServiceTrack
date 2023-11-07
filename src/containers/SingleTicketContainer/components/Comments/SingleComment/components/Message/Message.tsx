import { Typography } from 'components/common/Typography';

import * as S from './styled';
import { EFieldName } from 'models/Activity';

interface IProps {
  newValue: string;
  oldValue: string;
  fieldName: EFieldName;
  systemActivity?: boolean;
  userActivity?: boolean;
}

export const Message = ({ oldValue, newValue, fieldName, systemActivity, userActivity }: IProps) => {
  return (
    <S.Wrapper>
      {userActivity && <Typography>{newValue}</Typography>}
      {systemActivity && (
        <>
          <Typography>
            {oldValue ? (
              <>
                Field <b>{fieldName}</b> was changed from <b>{oldValue}</b> to <b>{newValue}</b>
              </>
            ) : (
              <>
                Field <b>{fieldName}</b> was set to <b>{newValue}</b>
              </>
            )}
          </Typography>
        </>
      )}
    </S.Wrapper>
  );
};
