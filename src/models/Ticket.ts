import { Assigned } from './Assigned';
import { Creator } from './Creator';
import { IUploadFileResponse } from './File';
import { IKeyValue } from './Key_Value';

export interface ITicket {
  tickets: ISingleTicket[];
}

export interface ISingleTicket {
  id: string;
  title: string;
  description: string;
  client: string;
  assigned: Assigned;
  state: string;
  priority: string;
  creationDate: string;
  LastModificationDate: string;
  creator: Creator;
  number: number;
  note: string;
  files?: IUploadFileResponse[];
}

export interface ISingleTicketUpdate extends Pick<ISingleTicket, 'title' | 'description'> {
  id: string | null;
  note: string | null;
  state: string | null;
  priority: string | null;
  files?: string[] | null;
}

export interface ISingleTicketForm extends Pick<ISingleTicket, 'title' | 'client' | 'description'> {
  note: string | null;
  state: IKeyValue | null;
  priority: IKeyValue | null;
  id: string | null;
  assigned: Assigned;
  assignedId: string | null;
  creator: Creator;
  creatorId: string;
  assignedName: string;
  creatorName: string;
}
