import { HelmetTags } from 'components/common/HelmetTags';
import { ChangePasswordContainer } from 'containers/ChangePasswordContainer';

const ChangePasswordPage = () => {
  return (
    <>
      <HelmetTags title={'Change password'} />
      <ChangePasswordContainer />
    </>
  );
};

export default ChangePasswordPage;
