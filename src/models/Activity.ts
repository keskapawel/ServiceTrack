import { IUploadFileResponse } from './File';
import { ISIngleUser } from './User';

export enum EActivityType {
  USER = 'User',
  SYSTEM = 'System',
}

export enum EClassType {
  COMMENT = 'Comment',
  TICKET = 'Ticket',
}

export enum EFieldName {
  COMMENTS = 'Comments',
  STATE = 'State',
  NOTE = 'Note',
  PRIORITY = 'Priority',
  ASSIGNED = 'Assigned',
  NEW_TICKET = 'New Ticket',
  ADD_COMMENT = 'Add Comment',
  ATTACHMENTS = 'Attachments',
}

export interface IActivity {
  activities: ISingleActivity[];
}

export interface ISingleActivity {
  id: string;
  className: EClassType;
  fieldName: EFieldName;
  newValue: string;
  oldValue: string;
  activityType: EActivityType;
  creator:
    | null
    | (Pick<ISIngleUser, 'uuid' | 'name' | 'surname' | 'userName'> & {
        avatar: IUploadFileResponse | null;
      });
  ticketID: string;
  creationDate: string;
  LastModificationDate: string;
}
