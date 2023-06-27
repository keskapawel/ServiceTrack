import { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import { changeLocation, clearLocationData, EPageType } from 'reducers/location-reducer';
import { useUserSelector } from 'reducers/user-reducer';
import { useTicketSelector } from 'reducers/ticket-reducer';

const Location = () => {
  const location = useLocation();
  const { program, id } = useParams();
  const dispatch = useAppDispatch();

  const { selectedUser } = useUserSelector();
  const { selectedTicket } = useTicketSelector();

  const customDetails = useMemo(() => {
    let header = '';
    let details = {};

    if (selectedUser?.id) {
      header = `${selectedUser?.firstName} ${selectedUser?.lastName}`;
      details = { pageType: EPageType.SINGLE_USER };
    }

    if (selectedTicket?.id) {
      header = `Ticket #${selectedTicket.id}`;
      details = { pageType: EPageType.TICKETS };
    }

    return { header, details };
  }, [selectedTicket, selectedUser?.firstName, selectedUser?.id, selectedUser?.lastName]);

  useEffect(() => {
    dispatch(changeLocation({ pathname: location.pathname, program, id, customDetails }));
    return () => {
      dispatch(clearLocationData());
    };
  }, [location, program, id, customDetails, dispatch]);

  return <></>;
};

export default Location;
