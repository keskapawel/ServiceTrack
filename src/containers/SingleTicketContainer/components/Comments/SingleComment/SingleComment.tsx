import { Header } from './components/Header';
import { Message } from './components/Message';

import * as S from './styled';

interface IProps {
  id: any;
  message: any;
  createdAt: any;
  user: any;
  parentObject: any;
  source: any;
  wrapperRef: any;
}

export const SingleComment = ({ id, message, createdAt, user, parentObject, source, wrapperRef }: IProps) => {
  return (
    <S.Wrapper ref={wrapperRef}>
      <Header id={id} user={user} createdAt={createdAt} parentObject={parentObject} source={source} />
      <Message message={message} />
    </S.Wrapper>
  );
};
