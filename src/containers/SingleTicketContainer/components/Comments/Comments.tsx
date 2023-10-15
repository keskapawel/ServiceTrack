import { AddComment } from './AddComment';
import { SingleComment } from './SingleComment/SingleComment';
import * as S from './styled';

interface CommentsProps {
  commentsList?: any;
}

export const Comments = ({ commentsList }: CommentsProps) => {
  const onComponentsSubmit = (data: any) => {
    console.log('submit: ', data);
  };

  return (
    <S.Wrapper>
      <S.Header>Activity</S.Header>
      <AddComment onCommentSubmit={onComponentsSubmit} />
      <S.ListWrapper>
        {commentsList.map((comment) => (
          <SingleComment key={comment.id} {...comment} />
        ))}
      </S.ListWrapper>
    </S.Wrapper>
  );
};
