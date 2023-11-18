import { SettingsBox } from 'components/common/SettingsBox/SettingsBox';
import * as S from './styled';
import { EPageType } from 'reducers/location-reducer';
import { Icon } from 'components/common/Icon';
import { useAuthUserSelector } from 'reducers/auth-reducer';

const SettingsContainer = () => {
  const { uuid } = useAuthUserSelector();

  return (
    <S.Wrapper>
      <S.SingleRow>
        <S.BoxWrapper>
          <SettingsBox
            icon={<Icon icon='UserAddIcon' color={'none'} outline size={24} />}
            title={'Manage Users'}
            description={'Manage list of system users and adjust their permissions'}
            redirectTo={`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}`}
          />
        </S.BoxWrapper>
      </S.SingleRow>
      <S.SingleRow>
        <S.Title>Your settings</S.Title>
        <S.BoxWrapper>
          <SettingsBox
            icon={<Icon icon='BellIcon' color={'none'} outline size={24} />}
            title={'Manage Notifications'}
            description={'Manage the way we are notifying you'}
            redirectTo={`/${EPageType.SETTINGS}/${EPageType.MANAGE_NOTIFICATIONS}`}
          />
          <SettingsBox
            icon={<Icon icon='LockClosedIcon' color={'none'} outline size={24} />}
            title={'Change password'}
            description={'Change your password'}
            redirectTo={`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}/${uuid}/${EPageType.CHANGE_PASSWORD}`}
          />
        </S.BoxWrapper>
      </S.SingleRow>
    </S.Wrapper>
  );
};

export default SettingsContainer;
