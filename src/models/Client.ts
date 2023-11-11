import { IUploadFileResponse } from './File';

export interface IClients {
  clients: ISingleClient[];
}

export interface ISingleClient {
  uuid: string;
  id: number;
  creationDate: string;
  lastModificationDate: string;
  name: string;
  creator: Creator;
}

export interface Creator {
  uuid: string;
  id: number;
  avatar: IUploadFileResponse | null;
  name?: string;
  surname?: string;
}
