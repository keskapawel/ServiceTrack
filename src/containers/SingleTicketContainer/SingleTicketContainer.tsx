import { useTicketSelector } from 'reducers/ticket-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';
import { Comments } from './components/Comments/Comments';
import { ISingleTicket } from 'models/Ticket';
import { useEffect } from 'react';

interface IProps {
  createNew?: boolean;
  data?: ISingleTicket;
}

export const SingleTicketContainer = ({ createNew, data }: IProps) => {
  const showLoader = createNew ? !createNew : !data?.id;

  const commentsList = [
    {
      id: 1,
      createdAt: '12/1/2021',
      user: {
        firstName: 'adam',
        lastName: 'kowalski',
      },
      source: 'user',
      message: 'dummyComment',
    },
  ];
  // tbd -> add comments

  return showLoader ? (
    <Loader />
  ) : (
    <>
      {!createNew && data && (
        <Header
          data={{
            createdAt: data?.creationDate,
            editedAt: data?.editDate,
            status: data.state,
            priority: data.priority,
          }}
        />
      )}
      <MainSection data={data} createNewMode={createNew} />
      {!createNew && <Comments commentsList={commentsList} />}
    </>
  );
};
