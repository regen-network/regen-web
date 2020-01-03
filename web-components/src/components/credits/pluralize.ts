export function pluralize(count: number, noun: string, suffix: string = 's'): string {
  return `${noun}${count > 1 ? suffix : ''}`;
}
