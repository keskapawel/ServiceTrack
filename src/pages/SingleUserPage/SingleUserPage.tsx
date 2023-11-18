import { HelmetTags } from 'components/common/HelmetTags';
import { SingleUserContainer } from 'containers/SingleUserContainer';

interface IProps {
  profilePage?: boolean;
}

const SingleUserPage = ({ profilePage }: IProps) => {
  return (
    <>
      <HelmetTags title={'Profile'} />
      <SingleUserContainer profilePage={profilePage} />
    </>
  );
};

export default SingleUserPage;
