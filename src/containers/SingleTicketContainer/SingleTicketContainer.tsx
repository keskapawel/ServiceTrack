import { useTicketSelector } from 'reducers/ticket-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';
import { Comments } from './components/Comments/Comments';
import { ISingleTicket } from 'models/Ticket';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTicketActivitiesQuery } from 'services/activity';
import { SingleTicketDocumentContainer } from 'containers/SingleTicketDocumentContainer';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IUploadFileResponse } from 'models/File';

interface IProps {
  createNew?: boolean;
  data?: ISingleTicket;
  showAnalitics?: boolean;
}

export const SingleTicketContainer = ({ createNew, data, showAnalitics = false }: IProps) => {
  const { id } = useParams();
  const { isEditMode } = useTicketSelector();
  const { data: activityData, isLoading } = useGetTicketActivitiesQuery(!createNew ? { id: data?.uuid ?? id ?? '' } : skipToken);
  const [documentData, setDocumentData] = useState<IUploadFileResponse>();

  const showLoader = createNew ? !createNew : !data?.uuid;

  const getDocumentData = (docData) => {
    setDocumentData(docData);
  };

  return showLoader ? (
    <Loader />
  ) : (
    <>
      {!createNew && data && (
        <Header
          data={{
            createdAt: data?.creationDate,
            editedAt: data?.lastModificationDate,
            status: data.state,
            priority: data.priority,
          }}
        />
      )}
      <MainSection data={data} createNewMode={createNew} documentData={documentData} />
      <SingleTicketDocumentContainer
        id={data?.uuid ?? ''}
        getDocumentData={getDocumentData}
        createNew={createNew}
        editMode={isEditMode}
        ticketData={data}
      />
      {!createNew && <Comments commentsList={activityData?.data?.activities} isLoading={isLoading} ticketId={data?.uuid ?? id ?? ''} />}
      {showAnalitics && (
        <>
          <p>xd</p>
        </>
      )}
    </>
  );
};
