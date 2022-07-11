export function pluralize(
  count: number,
  noun: string,
  suffix = 's',
): string {
  return `${noun}${count > 1 ? suffix : ''}`;
}
