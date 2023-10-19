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
  STATE = 'State',
  PRIORITY = 'Priority',
  CONTENT = 'Content',
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
  userId: null | Pick<ISIngleUser, 'id' | 'name' | 'surname' | 'userName'>;
  ticketID: string;
  creationDate: string;
  LastModificationDate: string;
}
