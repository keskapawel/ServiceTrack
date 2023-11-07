import { IUploadFileResponse } from './File';

export interface Creator {
  uuid: string;
  id: number;
  userName: string;
  name: string;
  surname: string;
  photo?: IUploadFileResponse[];
}
