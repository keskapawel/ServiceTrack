import { Typography } from 'components/common/Typography';

import * as S from './styled';
import { EFieldName } from 'models/Activity';
import { useTicketSelector } from 'reducers/ticket-reducer';

interface IProps {
  newValue: string;
  oldValue: string;
  fieldName: EFieldName;
  systemActivity?: boolean;
  userActivity?: boolean;
}

export const Message = ({ oldValue, newValue, fieldName, systemActivity, userActivity }: IProps) => {
  const { selectedTicket } = useTicketSelector();
  return (
    <S.Wrapper>
      {userActivity && ![EFieldName.ATTACHMENTS, EFieldName.NEW_TICKET].includes(fieldName) && <Typography>{newValue}</Typography>}
      {fieldName === EFieldName.NEW_TICKET && (
        <Typography>
          Ticket <b>#{selectedTicket?.id}</b> was created by{' '}
          <b>
            {selectedTicket?.creator.name} {selectedTicket?.creator.surname}
          </b>
        </Typography>
      )}
      {fieldName === EFieldName.ATTACHMENTS && (
        <Typography>
          New file&nbsp;
          <b>{newValue}</b>
          &nbsp;was uploaded by&nbsp;
          <b>
            {selectedTicket?.creator.name} {selectedTicket?.creator.surname}
          </b>
        </Typography>
      )}
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
