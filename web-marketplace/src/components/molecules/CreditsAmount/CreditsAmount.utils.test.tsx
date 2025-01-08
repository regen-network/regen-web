import { formatCurrencyAmount } from './CreditsAmount.utils';

describe('formatCurrencyAmount', () => {
  it('should format a number to max two decimals', () => {
    expect(formatCurrencyAmount(123.456)).toBe(123.45);
    expect(formatCurrencyAmount(123)).toBe(123);
    expect(formatCurrencyAmount(123.4)).toBe(123.4);
  });

  it('should format a string to two decimals', () => {
    expect(formatCurrencyAmount('123.456')).toBe(123.45);
    expect(formatCurrencyAmount('123')).toBe(123);
    expect(formatCurrencyAmount('123.4')).toBe(123.4);
  });

  it('should round up to two decimals if roundUpDecimal is true', () => {
    expect(formatCurrencyAmount(123.456, true)).toBe(123.46);
    expect(formatCurrencyAmount(123.451, true)).toBe(123.46);
    expect(formatCurrencyAmount(123.4, true)).toBe(123.4);
  });

  it('should return 0 for invalid numeric values', () => {
    expect(formatCurrencyAmount('abc')).toBe(0);
    expect(formatCurrencyAmount(NaN)).toBe(0);
  });

  it('should handle edge cases', () => {
    expect(formatCurrencyAmount(0)).toBe(0);
    expect(formatCurrencyAmount('0')).toBe(0);
    expect(formatCurrencyAmount('')).toBe(0);
  });
});
