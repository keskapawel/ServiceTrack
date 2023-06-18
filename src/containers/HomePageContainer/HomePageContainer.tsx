import { Box } from 'components/common/Box';

import * as S from './styled';

const dummyData = [
  {
    name: '1 title',
    id: '1',
    icon: 'icon',
  },
  {
    name: '2 title',
    id: '2',
    icon: 'icon',
  },
  {
    name: '3 title',
    id: '3',
    icon: 'icon',
  },
  {
    name: '4 title',
    id: '4',
    icon: 'icon',
  },
];
export const HomePageContainer = () => {
  return (
    <S.Wrapper>
      {dummyData.map((item) => (
        <Box {...item} key={item.id} />
      ))}
    </S.Wrapper>
  );
};
