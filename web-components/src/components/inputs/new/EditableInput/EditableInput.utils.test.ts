import { sanitizeValue } from './EditableInput.utils';

describe('sanitizeValue', () => {
  it('should return "0." if value starts with "."', () => {
    expect(sanitizeValue('.')).toBe('0.');
  });

  it('should return "0." if value is "0.a"', () => {
    expect(sanitizeValue('0.a')).toBe('0.');
  });

  it('should return "0." if value is "0."', () => {
    expect(sanitizeValue('0.')).toBe('0.');
  });

  it('should return "0.1" if value is "0.1"', () => {
    expect(sanitizeValue('0.1')).toBe('0.1');
  });

  it('should strip leading zeros', () => {
    expect(sanitizeValue('00123')).toBe('123');
  });

  it('should strip non-digit characters', () => {
    expect(sanitizeValue('123abc')).toBe('123');
  });

  it('should strip multiple dots', () => {
    expect(sanitizeValue('123.45.67')).toBe('123.45');
  });

  it('should return empty string if value is empty', () => {
    expect(sanitizeValue('')).toBe('');
  });

  it('should return empty string if value contains only non-digit characters', () => {
    expect(sanitizeValue('abc')).toBe('');
  });

  it('should handle complex cases', () => {
    expect(sanitizeValue('0.0.0')).toBe('0.0');
    expect(sanitizeValue('0.123.456')).toBe('0.123');
    expect(sanitizeValue('00123.45.67abc')).toBe('123.45');
  });
});
