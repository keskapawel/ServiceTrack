import { HelmetTags } from 'components/common/HelmetTags';
import { SingleTicketContainer } from 'containers/SingleTicketContainer';

const SingleTicketPage = () => {
  return (
    <>
      <HelmetTags title={'Ticket'} />
      <SingleTicketContainer />
    </>
  );
};

export default SingleTicketPage;
