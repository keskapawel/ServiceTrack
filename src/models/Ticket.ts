import { Assigned } from './Assigned';
import { Creator } from './Creator';
import { IUploadFileResponse } from './File';
import { IKeyValue } from './Key_Value';

export interface ITicket {
  tickets: ISingleTicket[];
}

export interface ISingleTicket {
  uuid: string;
  title: string;
  description: string;
  client: string;
  assigned: Assigned;
  state: string;
  priority: string;
  creationDate: string;
  lastModificationDate: string;
  creator: Creator;
  id: number;
  note: string;
  files?: IUploadFileResponse[];
}

export interface ISingleTicketUpdate {
  id: string | null;
  note: string | null;
  state: string | null;
  priority: string | null;
  title: string | null;
  description: string | null;
  files?: string[] | null;
}

export interface ISingleTicketForm extends Pick<ISingleTicket, 'title' | 'client' | 'description'> {
  note: string | null;
  state: IKeyValue | null;
  priority: IKeyValue | null;
  uuid: string | null;
  assigned: Assigned;
  assignedId: string | null;
  creator: Creator;
  creatorId: string;
  assignedName: string;
  creatorName: string;
}
