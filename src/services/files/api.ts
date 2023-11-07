import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { IUploadFile, IUploadFileResponse } from 'models/File';
import { AttachmentFormData } from './formData';

export const filesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFile: build.query<IApiData<{ file: IUploadFileResponse }>, { fileName: string; id: string }>({
      query: ({ id, fileName }) => {
        return {
          url: `files/${id}/${fileName}`,
          method: 'GET',
        };
      },
      providesTags: [BASE_TAGS.UPLOAD_FILE],
    }),
    uploadFile: build.mutation<IApiData<{ file: IUploadFileResponse }>, IUploadFile & { id: string }>({
      query: ({ id, file, description }) => {
        const formData = AttachmentFormData({
          file,
          description,
        });
        return {
          url: `files/${id}/upload`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [BASE_TAGS.UPLOAD_FILE, BASE_TAGS.SINGLE_USER, BASE_TAGS.TICKET],
    }),
    editFile: build.mutation<IApiData<{ file: IUploadFileResponse }>, IUploadFile & { id: string }>({
      query: ({ id, file, description }) => {
        const formData = AttachmentFormData({
          file,
          description,
        });
        return {
          url: `files/${id}/upload`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [BASE_TAGS.UPLOAD_FILE, BASE_TAGS.SINGLE_USER, BASE_TAGS.TICKET],
    }),
    uploadFileToNewResource: build.mutation<IApiData<{ file: IUploadFileResponse }>, IUploadFile>({
      query: ({ file, description }) => {
        const formData = AttachmentFormData({
          file,
          description,
        });
        return {
          url: `files/upload`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [BASE_TAGS.UPLOAD_FILE, BASE_TAGS.SINGLE_USER, BASE_TAGS.TICKET],
    }),
    removeFile: build.mutation<IApiData<unknown>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `files/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [BASE_TAGS.TICKET, BASE_TAGS.SINGLE_USER],
    }),
    downloadFile: build.mutation<IApiData<unknown>, { id: string; fileName: string }>({
      query: ({ id, fileName }) => {
        return {
          url: `files/${id}/${fileName}?download=true`,
          method: 'GET',
          responseHandler: async (response) => window.location.assign(window.URL.createObjectURL(await response.blob())),
          cache: 'no-cache',
        };
      },
      invalidatesTags: [BASE_TAGS.UPLOAD_FILE],
    }),
  }),
  overrideExisting: false,
});

export const { useGetFileQuery, useRemoveFileMutation, useUploadFileMutation, useUploadFileToNewResourceMutation, useDownloadFileMutation } =
  filesApi;
