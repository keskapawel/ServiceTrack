import { HelmetTags } from 'components/common/HelmetTags';
import { ManageNotificationContainer } from 'containers/ManageNotificationContainer';
import { useGetNotificationsSettingsQuery } from 'services/auth';

const ManageNotificationsPage = () => {
  const { data, isLoading } = useGetNotificationsSettingsQuery();

  return (
    <>
      <HelmetTags title={'Manage Users'} />
      {data?.data?.notificationOptions && <ManageNotificationContainer data={data.data.notificationOptions} isLoading={isLoading} />}
    </>
  );
};

export default ManageNotificationsPage;
