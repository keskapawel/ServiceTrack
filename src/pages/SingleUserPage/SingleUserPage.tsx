import { HelmetTags } from 'components/common/HelmetTags';
import { SingleUserContainer } from 'containers/SingleUserContainer';

const SingleUserPage = () => {
  return (
    <>
      <HelmetTags title={'Profile'} />
      <SingleUserContainer />
    </>
  );
};

export default SingleUserPage;
