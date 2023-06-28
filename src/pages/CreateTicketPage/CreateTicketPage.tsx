import { HelmetTags } from 'components/common/HelmetTags';
import { SingleTicketContainer } from 'containers/SingleTicketContainer';

const CreateTicketPage = () => {
  return (
    <>
      <HelmetTags title={'Create Ticket'} />
      <SingleTicketContainer createNew />
    </>
  );
};

export default CreateTicketPage;
