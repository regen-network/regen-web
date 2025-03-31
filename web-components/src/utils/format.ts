import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(duration);

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
  return new Intl.NumberFormat(navigator.language || 'en-US', options).format(
    number,
  );
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
export const DATE_FORMAT_SECONDARY = 'MMM D, YYYY';
export function formatDate(
  date: dayjs.ConfigType,
  format: string = 'MMMM D, YYYY',
  utc?: boolean,
): string {
  if (!date) return '';
  if (utc) return dayjs.utc(date).format(format);
  return dayjs(date).format(format);
}

type FormatNumberParams = {
  num: number | string | undefined;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatNumber({
  num,
  maximumFractionDigits,
  minimumFractionDigits,
}: FormatNumberParams): string {
  if (!num) return '-';
  if (typeof num === 'string') num = parseFloat(num);
  if (!maximumFractionDigits && !minimumFractionDigits) num = Math.floor(num);
  return num > 0
    ? num.toLocaleString(undefined, {
        maximumFractionDigits,
        minimumFractionDigits,
      })
    : '-';
}

export function formatDuration(seconds: number): string {
  const _duration = dayjs.duration(seconds, 'seconds');
  const durationArr = _duration.humanize().split(' ');
  const condition = durationArr[1].charAt(durationArr[1].length - 1) === 's';
  const textPart = condition ? durationArr[1].slice(0, -1) : durationArr[1];
  return `${durationArr[0]}-${textPart}`;
}

/**
 * Rounds a number to the nearest whole number and returns it as a string.
 * Can handle both string and number inputs.
 *
 * @param value - The value to round (string or number)
 * @returns The rounded number
 */
export const roundToClosestWholeNumber = (value: string | number): string => {
  if (value === undefined || value === null) return '0';

  const numericValue =
    typeof value === 'string' ? parseFloat(value) : Number(value);

  return Math.round(numericValue).toString();
};
