import { IUploadFileResponse } from './File';

export interface Assigned {
  id: number;
  uuid: string;
  userName: string;
  name: string;
  surname: string;
  photo?: IUploadFileResponse[];
}
