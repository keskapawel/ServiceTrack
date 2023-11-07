import { IUploadFileResponse } from './File';
import { Roles } from './Roles';

export interface IUsers {
  users: ISIngleUser[];
}

export interface ISIngleUser {
  id: number;
  uuid: string;
  userName: string;
  name: string | null;
  surname: string;
  email: string;
  lastLoginDateTime: null;
  credentialExpireDate: null;
  accountExpireDate: null;
  enabled: boolean;
  expired: boolean;
  isCredentialExpired: boolean;
  password: string;
  rules: Roles[];
  creationDate: string;
  lastModified: string;
  avatar: IUploadFileResponse | null;
}

export interface ISIngleUserUpdate extends Pick<ISIngleUser, 'uuid' | 'userName' | 'name' | 'surname' | 'email'> {
  rules: { id: string }[] | undefined;
  photoId: string;
}

export interface ISingleUserForm extends Omit<ISIngleUser, 'rules' | 'enabled' | 'id'> {
  rules:
    | {
        key: string;
        value: string;
        id: string;
      }[]
    | undefined;
  enabled: boolean | null;
  uploadFileData: IUploadFileResponse | null;
  id?: number;
}
