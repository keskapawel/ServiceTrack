import { HelmetTags } from 'components/common/HelmetTags';
import { TicketsContainer } from 'containers/TicketsContainer';
import { useTicketsQuery } from 'services/tickets';

const TicketsPage = () => {
  const { data } = useTicketsQuery({});

  return (
    <>
      <HelmetTags title={'Tickets'} />
      <TicketsContainer tickets={data?.data.tickets} />
    </>
  );
};

export default TicketsPage;
