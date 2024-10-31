export const sanitizeValue = (value: string): number => {
  if (value === '0' || value.startsWith('0.')) {
    return Number(value);
  }
  // Strip leading zeros
  const sanitized = value.replace(/^0+/, '');
  return sanitized ? Number(sanitized) : 0;
};
