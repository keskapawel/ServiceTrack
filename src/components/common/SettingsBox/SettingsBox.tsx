import { memo } from 'react';

import { Typography } from 'components/common/Typography';

import { fontSize } from 'styles/font';
import { palette } from 'styles/palette';
import * as S from './styled';

interface IProps {
  icon: JSX.Element;
  title: string;
  description: string;
  redirectTo?: string;
}

export const Component = ({ icon, title, description, redirectTo }: IProps) => {
  return (
    <S.Wrapper href={redirectTo}>
      <S.IconContainer>{icon}</S.IconContainer>
      <Typography sx={{ fontSize: fontSize[14] }} color={palette.dark}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: fontSize[12] }}>{description}</Typography>
    </S.Wrapper>
  );
};

Component.displayName = 'SettingsBox';

export const SettingsBox = memo(Component);
