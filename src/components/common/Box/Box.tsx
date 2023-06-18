import * as S from './styled';

interface BoxProps {
  id?: string;
  icon?: string;
  name?: string;
}

export const Box = ({ id, name, icon }: BoxProps) => {
  return (
    <S.Wrapper key={id}>
      <p>{name}</p>
      <p>{icon}</p>
    </S.Wrapper>
  );
};
