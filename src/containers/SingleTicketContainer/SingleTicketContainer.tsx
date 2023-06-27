import { useTicketSelector } from 'reducers/ticket-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';

export const SingleTicketContainer = () => {
  const { selectedTicket } = useTicketSelector();

  const isLoading = false;

  return isLoading || !selectedTicket ? (
    <Loader />
  ) : (
    <>
      <Header
        data={{
          createdAt: selectedTicket?.ticketCreatedDate,
          editedAt: selectedTicket?.ticketEditDate,
          status: selectedTicket.ticketStatus,
          priority: selectedTicket.ticketPriority,
        }}
      />
      <MainSection data={selectedTicket} />
    </>
  );
};
