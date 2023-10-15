import { HelmetTags } from 'components/common/HelmetTags';
import { SingleUserContainer } from 'containers/SingleUserContainer';

const CreateUserPage = () => {
  return (
    <>
      <HelmetTags title={'Create User'} />
      <SingleUserContainer createNew />
    </>
  );
};

export default CreateUserPage;
