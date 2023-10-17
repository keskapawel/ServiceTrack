import { IClient } from './Client';

export interface ITicket {
  tickets: ISingleTicket[];
}

export interface ISingleTicket {
  id: string;
  title: string;
  description: string;
  client: IClient;
  userId: string;
  state: string;
  priority: string;
  creationDate: string;
  LastModificationDate: string;
  notes: string;
}

export interface ISingleTicketUpdate extends Pick<ISingleTicket, 'title' | 'description' | 'userId' | 'state' | 'priority' | 'notes'> {
  id: string | null;
  client: string;
}

export interface ISingleTicketForm extends Pick<ISingleTicket, 'title' | 'client' | 'description' | 'userId' | 'notes'> {
  state: {
    key: string;
    value: string;
  };
  priority: {
    key: string;
    value: string;
  };
  id: string | null;
}
