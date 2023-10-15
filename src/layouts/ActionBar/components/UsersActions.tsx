import { Button } from 'components/common/Button';
import { EPageType } from 'pages/PageType';

export const UsersActions = () => {
  return <Button href={`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}/${EPageType.CREATE_USER}`}>Create new user</Button>;
};
