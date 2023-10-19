import { useTicketSelector } from 'reducers/ticket-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';
import { Comments } from './components/Comments/Comments';
import { ISingleTicket } from 'models/Ticket';
import { useEffect } from 'react';
import { useGetTicketCommentsQuery } from 'services/comments';
import { useParams } from 'react-router-dom';
import { useGetTicketActivitiesQuery } from 'services/activity';

interface IProps {
  createNew?: boolean;
  data?: ISingleTicket;
}

export const SingleTicketContainer = ({ createNew, data }: IProps) => {
  const { id } = useParams();
  const { data: commentsData } = useGetTicketCommentsQuery({ id: data?.id ?? id ?? '' });
  const { data: activityData } = useGetTicketActivitiesQuery({ id: data?.id ?? id ?? '' });

  const showLoader = createNew ? !createNew : !data?.id;

  return showLoader ? (
    <Loader />
  ) : (
    <>
      {!createNew && data && (
        <Header
          data={{
            createdAt: data?.creationDate,
            editedAt: data?.LastModificationDate,
            status: data.state,
            priority: data.priority,
          }}
        />
      )}
      <MainSection data={data} createNewMode={createNew} />
      {!createNew && <Comments commentsList={activityData?.data?.activities} ticketId={data?.id ?? id ?? ''} />}
    </>
  );
};
