export function getFormattedDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions | undefined,
): string {
  return typeof date === 'string' ? date : new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

export function getFormattedNumber(number: number, options?: Intl.NumberFormatOptions | undefined): string {
  return new Intl.NumberFormat('en-US', options).format(number);
}
