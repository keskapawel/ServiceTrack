export enum ECommentTypes {
  USER = 'User',
  SYSTEM = 'System',
}
export interface IComment {
  comments: ISingleComment[];
}

export interface ISingleComment {
  id: string;
  content: string;
  subject: string;
  creator: string;
  creationDate: string;
  lastModyficationDate: string;
}

export interface ICreateSingleComment extends Pick<ISingleComment, 'content' | 'subject'> {
  creator: string;
}
