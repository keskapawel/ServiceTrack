import { Icon } from 'components/common/Icon';
import * as S from './styled';
import { SettingsBox } from 'components/common/SettingsBox/SettingsBox';
import { EPageType } from 'pages/PageType';

const dummyData = [
  {
    name: 'Tickets',
    id: '1',
    icon: 'ClipboardIcon',
    link: `${EPageType.TICKETS}`,
    description: 'Another day in paradise...',
  },
  {
    name: 'Settings',
    id: '2',
    icon: 'AdjustmentsIcon',
    link: `${EPageType.SETTINGS}`,
    description: 'Adjust settings',
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
