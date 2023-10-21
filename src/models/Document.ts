export interface IAttachmentTwo {
  id: string;
  objectId: string;
  name: string;
  fileType: string;
  creationDate: string;
  lastModificationDate: string;
  url: string;
}

import { IApiFile } from './File';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAttachment {
  id: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  number: string;
  file: IApiFile;
}

export interface ICreateAttachment {
  file: any;
  description?: string;
  status?: string;
  number?: string;
}
