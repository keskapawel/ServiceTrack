import { IUploadFileResponse } from './File';

export interface Creator {
  id: string;
  userName: string;
  name: string;
  surname: string;
  photo?: IUploadFileResponse[];
}
