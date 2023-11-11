import { IUploadFileResponse } from './File';

export interface ISingleProfile {
  myProfile: MyProfile;
}

export interface MyProfile {
  uuid: string;
  id: number;
  lastModificationDate: string;
  name: string;
  surname: string;
  avatar: IUploadFileResponse | null;
  email: string;
  lastLoginDate: string;
  credentialExpirationDate: string;
  accountExpirationDate: string;
}
