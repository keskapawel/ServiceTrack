import { SettingsBox } from '../../components/common/SettingsBox/SettingsBox';
import { Icon } from 'components/common/Icon';

import { HelmetTags } from 'components/common/HelmetTags';
import { SettingsContainer } from 'containers/SettingsContainer';

export const SettingsPage = () => {
  return (
    <>
      <HelmetTags title={'Settings'} />
      <SettingsContainer />
    </>
  );
};
