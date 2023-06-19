export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  createdAt?: Date;
  lastLogin?: string;
}
