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
  editDate: string;
  notes: string;
}

export interface ISingleTicketUpdate extends Pick<ISingleTicket, 'id' | 'title' | 'description' | 'userId' | 'state' | 'priority' | 'client'> {} // ad notes
