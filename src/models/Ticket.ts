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
