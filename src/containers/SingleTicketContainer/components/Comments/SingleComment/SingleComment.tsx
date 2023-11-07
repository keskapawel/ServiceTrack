import { Header } from './components/Header';
import { Message } from './components/Message';

import * as S from './styled';
import { EFieldName, ISingleActivity } from 'models/Activity';

export const SingleComment = ({ oldValue, newValue, creator, creationDate, fieldName }: ISingleActivity) => {
  const user = [EFieldName.COMMENTS, EFieldName.NOTE].includes(fieldName);
  const system = [EFieldName.STATE, EFieldName.PRIORITY, EFieldName.ASSIGNED].includes(fieldName);

  return (
    <S.Wrapper>
      <Header
        user={{
          uuid: creator?.uuid ?? '',
          username: creator?.name ?? '',
          surname: creator?.surname ?? '',
          photo: creator?.avatar ?? undefined,
        }}
        createdAt={creationDate}
        systemActivity={system}
        userActivity={user}
      />
      <Message oldValue={oldValue} newValue={newValue} fieldName={fieldName} systemActivity={system} userActivity={user} />
    </S.Wrapper>
  );
};
