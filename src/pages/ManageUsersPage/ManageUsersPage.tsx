import { HelmetTags } from 'components/common/HelmetTags';
import { ManageUsersContainer } from 'containers/ManageUsersContainer';

const ManageNotificationsPage = () => {
  return (
    <>
      <HelmetTags title={'Manage Notifications'} />
      <ManageUsersContainer />
    </>
  );
};

export default ManageNotificationsPage;
