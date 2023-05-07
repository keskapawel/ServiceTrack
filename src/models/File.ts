export interface IFile {
  lastModified: string;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface IApiFile {
  contentType: string;
  filename: string;
  url: string;
}
