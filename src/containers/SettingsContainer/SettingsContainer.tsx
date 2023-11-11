import { SettingsBox } from 'components/common/SettingsBox/SettingsBox';
import * as S from './styled';
import { EPageType } from 'reducers/location-reducer';
import { Icon } from 'components/common/Icon';

const SettingsContainer = () => {
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
    </S.Wrapper>
  );
};

export default SettingsContainer;
