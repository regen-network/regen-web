export function truncateEnd(text: string, maxLength: number): string {
  return text && text.length > maxLength
    ? `${text.slice(0, maxLength)}…`
    : text;
}
