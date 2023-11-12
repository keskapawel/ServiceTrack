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

export enum EDateType {
  MMDDYYYY = 'MMDDYYYY',
  YYMMDD = 'YYMMDD',
  // domain specific
}

export enum EDateSplitType {
  Backslash = '/',
  Dash = '-',
}

export const formatAppDate = (date: string | Date | Dayjs | undefined | null, dateFormat: EDateFormat = EDateFormat.FULL_DATE): string | null => {
  if (dateFormat === EDateFormat.API_FORMAT && !date) return null;

  if (!date) return 'N/A';

  return dayjs(date).format(dateFormat);
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getParentPath = (currentPath: string) => {
  const splitPath = currentPath.split('/');
  const parentPath = splitPath.splice(1, splitPath.length - 2).join('/');
  return `/${parentPath}`;
};

export const formatDate = (
  date: string | Date | undefined | null,
  dateType: EDateType = EDateType.YYMMDD,
  splitType: EDateSplitType = EDateSplitType.Dash,
) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  if (dateType === EDateType.MMDDYYYY) {
    return [month, day, year].join(splitType);
  }
  if (dateType === EDateType.YYMMDD) {
    return [year, month, day].join(splitType);
  }
};

export const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`;
};

export const convertDate = (date) => {
  const newDate = formatDate(date, EDateType.MMDDYYYY, EDateSplitType.Backslash);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const today = new Date();
  today.setDate(today.getDate());

  if (yesterday.toDateString() === new Date(date).toDateString()) {
    return 'Yesterday';
  }

  if (today.toDateString() === new Date(date).toDateString()) {
    const strTime = formatAMPM(new Date(date));
    return `Today, ${strTime}`;
  }

  return newDate;
};

export const range = (start: number, stop: number, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
