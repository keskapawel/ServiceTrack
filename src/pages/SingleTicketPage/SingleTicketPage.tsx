import { HelmetTags } from 'components/common/HelmetTags';
import { SingleTicketContainer } from 'containers/SingleTicketContainer';
import { useParams } from 'react-router-dom';
import { useTicketSelector } from 'reducers/ticket-reducer';
import { useGetSingleTicketQuery } from 'services/tickets';

const SingleTicketPage = () => {
  const { selectedTicket } = useTicketSelector();
  const { id } = useParams();

  const { data } = useGetSingleTicketQuery({ id: id ?? selectedTicket?.id ?? '' });

  console.log(data, 'data selectedTicket', selectedTicket);

  return (
    <>
      <HelmetTags title={'Ticket'} />
      <SingleTicketContainer data={selectedTicket ?? data?.data?.ticket} />
    </>
  );
};

export default SingleTicketPage;
