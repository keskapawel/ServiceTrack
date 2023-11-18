import { HelmetTags } from 'components/common/HelmetTags';
import { TicketsContainer } from 'containers/TicketsContainer';
import { EPageType } from 'reducers/location-reducer';
import { usePageDataSelector } from 'reducers/pageData-reducer';
import { useTicketsQuery } from 'services/tickets';

const TicketsPage = () => {
  const { sortQuery, paginationQuery } = usePageDataSelector(EPageType.TICKETS);
  const { data, isLoading } = useTicketsQuery({ sortQuery, paginationQuery });

  return (
    <>
      <HelmetTags title={'Tickets'} />
      <TicketsContainer isLoading={isLoading} tickets={data?.data.tickets} meta={data?.meta} initialSortBy={sortQuery} />
    </>
  );
};

export default TicketsPage;
