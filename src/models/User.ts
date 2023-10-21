import { IUploadFileResponse } from './File';
import { Roles } from './Roles';

export interface IUsers {
  users: ISIngleUser[];
}

export interface ISIngleUser {
  id: string;
  userName: string;
  name: string | null;
  surname: string;
  email: string;
  lastLoginDateTime: null;
  credentialExpireDate: null;
  accountExpireDate: null;
  isEnabled: boolean;
  isExpired: boolean;
  isCredentialExpired: boolean;
  password: string;
  rules: Roles[];
  creationDate: string;
  lastModified: string;
  file: IUploadFileResponse | null;
}

export interface ISIngleUserUpdate extends Pick<ISIngleUser, 'id' | 'userName' | 'name' | 'surname' | 'email'> {
  rules: { id: string }[] | undefined;
  photoId: string;
}

export interface ISingleUserForm extends Omit<ISIngleUser, 'rules' | 'isEnabled'> {
  rules:
    | {
        key: string;
        value: string;
        id: string;
      }[]
    | undefined;
  isEnabled: boolean | null;
  uploadFileData: IUploadFileResponse | null;
}
