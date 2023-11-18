import { ISingleComment } from 'models/Comment';
import { AddComment } from './AddComment';
import * as S from './styled';
import { SingleComment } from './SingleComment';
import { useCreateNewCommentMutation } from 'services/comments';
import { AlertMessages } from 'components/common/PopupAlert';
import { AlertVariants } from 'components/common/PopupAlert/constants';
import { useEffect } from 'react';
import { showAlertPopup } from 'reducers/popup-alert-reducer';
import { useDispatch } from 'react-redux';
import { ISingleActivity } from 'models/Activity';
import { useAuthUserSelector } from 'reducers/auth-reducer';
import { Loader } from 'components/common/Loader';

interface CommentsProps {
  commentsList?: ISingleActivity[];
  ticketId: string;
  isLoading?: boolean;
}

export const Comments = ({ commentsList, ticketId, isLoading }: CommentsProps) => {
  const { uuid } = useAuthUserSelector();
  const dispatch = useDispatch();
  const [createNewComment, { isSuccess, error }] = useCreateNewCommentMutation();

  const onComponentsSubmit = (data: string) => {
    createNewComment({
      content: data,
      subject: ticketId,
      creator: uuid,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(showAlertPopup({ variant: AlertVariants.SUCCESS, message: AlertMessages.COMMENT_ADDED }));
    }
    if (error) {
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
    }
  }, [dispatch, error, isSuccess]);

  return (
    <S.Wrapper>
      <S.Header>Activity</S.Header>
      <AddComment onCommentSubmit={onComponentsSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <S.ListWrapper>
          {commentsList
            ?.slice()
            ?.reverse()
            .map((comment) => (
              <SingleComment key={comment.id} {...comment} />
            ))}
        </S.ListWrapper>
      )}
    </S.Wrapper>
  );
};
