import { Icon } from 'components/common/Icon';
import * as S from './styled';
import { SettingsBox } from 'components/common/SettingsBox/SettingsBox';
import { EPageType } from 'pages/PageType';

const dummyData = [
  {
    name: 'Settings',
    id: '1',
    icon: 'AdjustmentsIcon',
    link: `${EPageType.SETTINGS}`,
    description: 'Adjust settings',
  },
  {
    name: '2 title',
    id: '2',
    icon: 'BookmarkIcon',
  },
  {
    name: '3 title',
    id: '3',
    icon: 'BookmarkIcon',
  },
  {
    name: '4 title',
    id: '4',
    icon: 'BookmarkIcon',
  },
];

export const HomePageContainer = () => {
  return (
    <S.Wrapper>
      {dummyData.map(({ name, id, icon, link, description }) => (
        <SettingsBox
          title={name}
          description={description ?? 'Lorem Ipsum...'}
          key={id}
          icon={<Icon icon={icon} color={'none'} outline size={24} />}
          redirectTo={link && link}
        />
      ))}
    </S.Wrapper>
  );
};
