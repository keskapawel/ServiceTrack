import { FC } from 'react';

import { palette } from 'styles/palette';

import * as S from './styled';
interface IProps {
  picture?: string;
  firstName: string;
  lastName: string;
  id: string;
  extended?: boolean;
  size?: 20 | 24 | 28 | 30 | 32 | 42 | 64 | 80 | 120 | 160;
}

const AvatarDetails: FC<IProps> = (props) => {
  const { picture, firstName, lastName, extended, size } = props;

  return (
    <>
      {picture ? (
        <S.CurrentUserProfilePicture src={picture} alt='User picture' $size={size || 32} />
      ) : (
        <S.TextWrapper bgColor={palette.outline} $size={size || 32}>
          <div>
            {firstName?.slice(0, 1)}
            {lastName?.slice(0, 1)}
          </div>
        </S.TextWrapper>
      )}
      {extended && (
        <S.Name>
          {firstName} {lastName}
        </S.Name>
      )}
    </>
  );
};

export const Avatar: FC<IProps> = (props) => {
  const { picture, firstName, lastName, id, extended, size } = props;
  return (
    <S.Wrapper $size={size || 32} extended={extended}>
      <span>
        <AvatarDetails picture={picture} firstName={firstName} lastName={lastName} id={id} extended={extended} size={size || 32} />
      </span>
    </S.Wrapper>
  );
};
