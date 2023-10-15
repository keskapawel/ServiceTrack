import { KeyboardEvent, useCallback, useState } from 'react';
import { Grid } from '@mui/material';

import { TextInput } from 'components/common/TextInput';
import { Typography } from 'components/common/Typography';

import * as S from './styled';

export interface IProps {
  onCommentSubmit: (comment: string) => void;
  disabled?: boolean;
}

export const AddComment = ({ onCommentSubmit, disabled = false }) => {
  const [commentValue, setCommentValue] = useState('');
  const isEmptyComment = !commentValue.length;

  const submit = useCallback(() => {
    if (commentValue.trim().length > 0) {
      onCommentSubmit(commentValue);
      setCommentValue('');
    }
  }, [commentValue, onCommentSubmit]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.stopPropagation();
      if (event.key === 'Enter') submit();
    },
    [submit],
  );

  return (
    <S.Wrapper>
      <Grid container display='flex'>
        <Grid item xs={9}>
          <TextInput
            disabled={disabled}
            label='Type something'
            placeholder='Type something'
            hideLabel
            name='addComment'
            value={commentValue}
            onChange={(event) => setCommentValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={3} textAlign='right' display='flex' justifyContent='end' alignItems='end'>
          <S.SendButton onClick={submit} variant='outlined' disabled={isEmptyComment}>
            <Typography>Send</Typography>
          </S.SendButton>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};
