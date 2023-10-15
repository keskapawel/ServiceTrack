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
  roles: Roles[] | unknown[];
  createdAt: string;
  lastModified: string;
}
