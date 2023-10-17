import { Roles } from './Roles';

export interface IUsers {
  users: ISIngleUser[];
}

export interface ISIngleUser {
  id: string;
  username: string;
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
  createdAt: string;
  lastModified: string;
}

export interface ISIngleUserUpdate extends Pick<ISIngleUser, 'id' | 'username' | 'name' | 'surname' | 'email' | 'rules'> {}
