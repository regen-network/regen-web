export type CurrencyCode = 'USD'; // | 'EUR' | 'GBP' | 'JPY';

const currencySymbols: Record<CurrencyCode, string> = {
  USD: '$', // US Dollar
  // EUR: '€', // Euro
  // GBP: '£', // British Pound
  // JPY: '¥', // Japanese Yen
};

export function getCurrencySymbol(currencyCode: CurrencyCode = 'USD'): string {
  return currencySymbols[currencyCode];
}
