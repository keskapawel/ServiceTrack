import { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import { changeLocation, clearLocationData, EPageType } from 'reducers/location-reducer';
import { useUserSelector } from 'reducers/user-reducer';
import { useTicketSelector } from 'reducers/ticket-reducer';
import { useAuthUserSelector } from 'reducers/auth-reducer';

const Location = () => {
  const location = useLocation();
  const authUserData = useAuthUserSelector();
  const { program, id } = useParams();
  const dispatch = useAppDispatch();

  const { selectedUser } = useUserSelector();
  const authUser = useAuthUserSelector();
  const { selectedTicket } = useTicketSelector();

  const customDetails = useMemo(() => {
    let header = '';
    let details = {};
    switch (location.pathname.split('/').at(1)) {
      case EPageType.SETTINGS:
        switch (location.pathname.split('/').at(2)) {
          case EPageType.MANAGE_USERS:
            header = `${selectedUser?.name} ${selectedUser?.surname}`;
            details = id === authUserData?.uuid ? { pageType: EPageType.PROFILE } : { pageType: EPageType.SINGLE_USER };
            break;
          default:
            header = '';
            details = {};
            break;
        }
        break;

      case EPageType.PROFILE:
        header = `${authUser?.name} ${authUser?.surname}`;
        details = { pageType: EPageType.PROFILE };
        break;

      case EPageType.TICKETS:
        header = `Ticket #${selectedTicket?.id}`;
        details = { pageType: EPageType.TICKETS };
        break;

      default:
        header = '';
        details = {};
        break;
    }

    return { header, details };
  }, [location.pathname, authUser?.name, authUser?.surname, selectedTicket?.id, selectedUser?.name, selectedUser?.surname]);

  useEffect(() => {
    dispatch(changeLocation({ pathname: location.pathname, program, id, customDetails }));
    return () => {
      dispatch(clearLocationData());
    };
  }, [location, program, id, customDetails, dispatch]);

  return <></>;
};

export default Location;
