import { Header } from './components/Header';
import { Message } from './components/Message';

import * as S from './styled';
import { ISingleActivity } from 'models/Activity';

export const SingleComment = ({ id, oldValue, newValue, creator, creationDate, fieldName, activityType, className }: ISingleActivity) => {
  return (
    <S.Wrapper>
      <Header
        id={id}
        user={{
          id: creator?.id ?? '',
          username: creator?.name ?? '',
          surname: creator?.surname ?? '',
          photo: creator?.photo ?? undefined,
        }}
        createdAt={creationDate}
        source={activityType}
        $className={className}
      />
      <Message oldValue={oldValue} newValue={newValue} fieldName={fieldName} $className={className} />
    </S.Wrapper>
  );
};
