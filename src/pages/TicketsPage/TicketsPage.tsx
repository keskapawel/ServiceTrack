import { HelmetTags } from 'components/common/HelmetTags';
import { TicketsContainer } from 'containers/TicketsContainer';

const TicketsPage = () => {
  return (
    <>
      <HelmetTags title={'Tickets'} />
      <TicketsContainer />
    </>
  );
};

export default TicketsPage;
