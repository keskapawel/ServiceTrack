export interface IUploadFileResponse {
  id: number;
  uuid: string;
  objectId: string;
  name: string;
  fileExtension: string;
  fileType: string;
  creationDate: string;
  lastModificationDate: string;
  url: string;
  description: string;
}

export interface IFile {
  lastModified: string;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  path: string;
}

export interface IApiFile {
  contentType: string;
  filename: string;
  url: string;
}

export interface IUploadFile {
  file: IFile;
  description?: string;
}
