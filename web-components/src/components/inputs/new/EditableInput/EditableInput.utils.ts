/*
 * Sanitizes a string to ensure it represents a valid numeric format.
 *
 * @example
 * sanitizeValue('.5')    // returns '0.5'
 * sanitizeValue('01.23') // returns '1.23'
 * sanitizeValue('1,23') // returns '1,23'
 * sanitizeValue('abc')   // returns ''
 * sanitizeValue('00')   // returns '0'
 */

import { getFormattedNumber } from '../../../../utils/format';

export const sanitizeValue = (value: string): string => {
  // Convert a leading '.' or ',' to '0.' or '0,'
  if (value.startsWith('.')) {
    return '0.';
  }
  if (value.startsWith(',')) {
    return '0,';
  }

  // Remove any character that is not a digit, comma, or period.
  let sanitized = value.replace(/[^0-9.,]/g, '');

  // Avoid having both a comma and a period at the same time
  // If both comma and period exist, decide which one to keep by checking which comes first.
  const commaIndex = sanitized.indexOf(',');
  const periodIndex = sanitized.indexOf('.');
  if (commaIndex !== -1 && periodIndex !== -1) {
    if (commaIndex < periodIndex) {
      // A comma appears first: remove all periods.
      sanitized = sanitized.replace(/\./g, '');
    } else {
      // A period appears first: remove all commas.
      sanitized = sanitized.replace(/,/g, '');
    }
  }

  // Ensure only one instance of the remaining decimal separator is present.
  if (sanitized.includes('.')) {
    sanitized = sanitized.replace(/(\..*?)\..*/g, '$1');
  }
  if (sanitized.includes(',')) {
    sanitized = sanitized.replace(/(,.*?),(.*)/g, '$1');
  }

  // Remove leading zeros, unless the number starts with '0.' or '0,'
  if (!(sanitized.startsWith('0.') || sanitized.startsWith('0,'))) {
    // If the entire string is zeros (e.g. "00"), return "0"
    if (/^0+$/.test(sanitized)) {
      sanitized = '0';
    } else {
      // If zeros are followed by other digits (e.g. "01"), remove the leading zeros.
      sanitized = sanitized.replace(/^0+/, '');
    }
  }

  return sanitized ? sanitized : '';
};

export const localizeNumber = (input: number) => {
  const number = Number(input);

  return getFormattedNumber(number, {
    minimumFractionDigits: 2,
  });
};
