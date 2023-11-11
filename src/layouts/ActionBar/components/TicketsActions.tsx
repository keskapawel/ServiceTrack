import { Button } from 'components/common/Button';
import { EPageType } from 'reducers/location-reducer';

export const TicketsActions = () => {
  return <Button href={`/${EPageType.TICKETS}/${EPageType.CREATE_TICKET}`}>Create new ticket</Button>;
};
