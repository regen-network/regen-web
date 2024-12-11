export const sanitizeValue = (value: string): string => {
  if (value.startsWith('.')) {
    return '0.';
  }
  if (value === '0' || value.startsWith('0.')) {
    // Disallow 0.[a-z]
    if (/^0\.[a-zA-Z]/.test(value)) {
      return '0.';
    }
    return value.replace(/(\..*?)\..*/g, '$1');
  }
  // Strip leading zeros, non digits and multiple dots
  const sanitized = value
    .replace(/[^0-9.]/g, '')
    .replace(/^0+/, '')
    .replace(/(\..*?)\..*/g, '$1');

  return sanitized ? sanitized : '';
};
