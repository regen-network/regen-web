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
