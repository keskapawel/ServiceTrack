import { HelmetTags } from 'components/common/HelmetTags';
import { ManageUsersContainer } from 'containers/ManageUsersContainer';

const ManageUsersPage = () => {
  return (
    <>
      <HelmetTags title={'Manage Users'} />
      <ManageUsersContainer />
    </>
  );
};

export default ManageUsersPage;
