import { HelmetTags } from 'components/common/HelmetTags';
import { PageNotFundContainer } from 'containers/PageNotFundContainer';

const PageNotFoundPage = () => {
  return (
    <>
      <HelmetTags title={'Page not found'} />
      <PageNotFundContainer />
    </>
  );
};

export default PageNotFoundPage;
