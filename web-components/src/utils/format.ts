import dayjs from 'dayjs';

export function getFormattedDate(
  date?: string | Date | null,
  options?: Intl.DateTimeFormatOptions | undefined,
): string {
  if (date) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      ...options,
    }).format(new Date(date));
  }
  return '';
}

export function getFormattedNumber(
  number: number,
  options?: Intl.NumberFormatOptions | undefined,
): string {
  return new Intl.NumberFormat('en-US', options).format(number);
}

export function getFormattedPeriod(start: string, end: string | Date): string {
  const startYear = new Date(start).getUTCFullYear();
  const endYear = new Date(end).getUTCFullYear();
  if (startYear === endYear) {
    return `${startYear}`;
  }
  return `${startYear}-${new Date(end).getUTCFullYear()}`;
}

export interface StandardInfo {
  documentId?: string | null;
  name: string;
  version: string;
}

export function formatStandardInfo(info: StandardInfo): string {
  return `${info.name}, ${info.documentId ? `${info.documentId}, ` : ''}${
    info.version
  }`;
}

/** wrapper for dayjs format function with default format `MMMM D, YYYY` (ex
 * "December 31, 2016") */
export function formatDate(
  date: dayjs.ConfigType,
  format: string = 'MMMM D, YYYY',
): string {
  return dayjs(date).format(format);
}

export function formatNumber(num: number | string | undefined): string {
  if (!num) return '-';
  if (typeof num === 'string') num = parseFloat(num);
  return num > 0 ? Math.floor(num).toLocaleString() : '-';
}
