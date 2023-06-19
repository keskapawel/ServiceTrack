import dayjs, { Dayjs } from 'dayjs';

export const trimEndingSpace = (str: string): string => {
  return str.replace(/\s*$/, '');
};

export const shortenString = (str: string, length: number): string => {
  if (str?.length <= length) {
    return str;
  }
  return trimEndingSpace(str.slice(0, length)) + '...';
};

export enum EDateFormat {
  FULL_DATE = 'MM/DD/YYYY HH:mm A',
  YEAR = 'MM/DD/YYYY',
  API_FORMAT = 'YYYY-MM-DD',
}

export const formatAppDate = (date: string | Date | Dayjs | undefined | null, dateFormat: EDateFormat = EDateFormat.FULL_DATE): string | null => {
  if (dateFormat === EDateFormat.API_FORMAT && !date) return null;

  if (!date) return 'N/A';

  return dayjs(date).format(dateFormat);
};
