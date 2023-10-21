import { IUploadFileResponse } from './File';

export interface Assigned {
  id: string;
  userName: string;
  name: string;
  surname: string;
  photo?: IUploadFileResponse[];
}
