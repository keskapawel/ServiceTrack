import { HelmetTags } from 'components/common/HelmetTags';
import { TicketsContainer } from 'containers/TicketsContainer';
import { EPageType } from 'reducers/location-reducer';
import { usePageDataSelector } from 'reducers/pageData-reducer';
import { useTicketsQuery } from 'services/tickets';

const TicketsPage = () => {
  const { sortQuery, paginationQuery } = usePageDataSelector(EPageType.TICKETS);
  const { data } = useTicketsQuery({ sortQuery, paginationQuery });

  return (
    <>
      <HelmetTags title={'Tickets'} />
      <TicketsContainer tickets={data?.data.tickets} meta={data?.meta} initialSortBy={sortQuery} />
    </>
  );
};

export default TicketsPage;
