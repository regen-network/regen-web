export function getAbbreviation(unit: string): string {
  switch (unit) {
    case 'hectares':
      return 'ha.';
    case 'acres':
      return 'acres';
    default:
      return 'ha.';
  }
}
