export function findFirstNonEmptyString(
  values: (string | undefined)[],
): string {
  for (const value of values) {
    if (value && value !== '') {
      return value;
    }
  }
  return '';
}
