import { Header } from './components/Header';
import { Message } from './components/Message';

import * as S from './styled';
import { ISingleActivity } from 'models/Activity';

export const SingleComment = ({ id, oldValue, newValue, userId, creationDate, fieldName, activityType, className }: ISingleActivity) => {
  return (
    <S.Wrapper>
      <Header
        id={id}
        user={{
          id: userId?.id ?? '',
          username: userId?.name ?? '',
          surname: userId?.surname ?? '',
        }}
        createdAt={creationDate}
        source={activityType}
        $className={className}
      />
      <Message oldValue={oldValue} newValue={newValue} fieldName={fieldName} $className={className} />
    </S.Wrapper>
  );
};
