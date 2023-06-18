import { HelmetTags } from 'components/common/HelmetTags';
import { LoginContainer } from 'containers/LoginContainer';

const LoginPage = () => {
  return (
    <>
      <HelmetTags title={'Login Page'} />
      <LoginContainer />
    </>
  );
};
export default LoginPage;
