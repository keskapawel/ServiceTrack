import { HelmetTags } from 'components/common/HelmetTags';
import { RegisterContainer } from 'containers/RegisterContainer';

const RegisterPage = () => {
  return (
    <>
      <HelmetTags title={'Register Page'} />
      <RegisterContainer />
    </>
  );
};
export default RegisterPage;
