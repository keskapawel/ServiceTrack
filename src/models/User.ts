import { IKeyValue } from './Key_Value';
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
}

export interface ISIngleUserUpdate extends Pick<ISIngleUser, 'id' | 'userName' | 'name' | 'surname' | 'email'> {
  rules: IKeyValue[] | undefined;
}

export interface ISingleUserForm extends Omit<ISIngleUser, 'rules' | 'isEnabled'> {
  rules: IKeyValue[] | undefined;
  isEnabled: boolean | null;
}
