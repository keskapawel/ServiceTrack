export interface IUpdateNotification {
  id: string;
  app: boolean;
  email: boolean;
}

export interface INotificationsList {
  notificationOptions: ISingleNotification[];
}

export interface ISingleNotification {
  uuid: string;
  id: number;
  lastModificationDate: string;
  app: boolean;
  email: boolean;
  type: string;
}
// not whole interface
