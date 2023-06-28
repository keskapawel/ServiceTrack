import { useTicketSelector } from 'reducers/ticket-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';

interface IProps {
  createNew?: boolean;
}

export const SingleTicketContainer = ({ createNew }: IProps) => {
  const { selectedTicket } = useTicketSelector();

  const isLoading = false;

  const showLoader = createNew ? !createNew : isLoading || !selectedTicket;

  return showLoader ? (
    <Loader />
  ) : (
    <>
      {!createNew && selectedTicket && (
        <Header
          data={{
            createdAt: selectedTicket?.ticketCreatedDate,
            editedAt: selectedTicket?.ticketEditDate,
            status: selectedTicket.ticketStatus,
            priority: selectedTicket.ticketPriority,
          }}
        />
      )}
      <MainSection data={selectedTicket} createNewMode={createNew} />
    </>
  );
};
