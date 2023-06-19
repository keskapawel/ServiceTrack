import { SettingsBox } from '../../components/common/SettingsBox/SettingsBox';
import { Icon } from 'components/common/Icon';

import * as S from './styled';
import { EPageType } from 'pages/PageType';

export const SettingsPage = () => {
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
