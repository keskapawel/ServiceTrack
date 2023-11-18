import { HelmetTags } from 'components/common/HelmetTags';
import { ManageUsersContainer } from 'containers/ManageUsersContainer';

const ManageUsersPage = () => {
  return (
    <>
      <HelmetTags title={'Manage Notifications'} />
      <ManageUsersContainer />
    </>
  );
};

export default ManageUsersPage;
