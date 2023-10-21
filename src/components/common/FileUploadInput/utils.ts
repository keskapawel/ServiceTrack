import { IApiFile } from 'models/File';

export const apiFileToFile = (apiFile?: IApiFile | File): File | undefined => {
  if (!apiFile) return undefined;

  if (apiFile instanceof File) return apiFile;

  return new File([], apiFile.filename ?? '', { type: apiFile.contentType ?? '' });
};
