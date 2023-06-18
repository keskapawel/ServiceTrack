import { HelmetTags } from 'components/common/HelmetTags';
import { HomePageContainer } from 'containers/HomePageContainer';

const HomePage = () => {
  return (
    <>
      <HelmetTags title={'Service Track'} />
      <HomePageContainer />
    </>
  );
};

export default HomePage;
