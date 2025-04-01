import { formatNumber, roundToClosestWholeNumber } from './format';

describe('formatNumber', () => {
  test('Should format 4 to 4.00', () => {
    // Given
    const num = 4;
    const minimumFractionDigits = 2;
    const expectedResult = '4.00';

    // When
    const result = formatNumber({ num, minimumFractionDigits });

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format 4.8785487 to 4.88', () => {
    // Given
    const num = 4.8785487;
    const minimumFractionDigits = 2;
    const maximumFractionDigits = 2;
    const expectedResult = '4.88';

    // When
    const result = formatNumber({
      num,
      minimumFractionDigits,
      maximumFractionDigits,
    });

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format 4.00001 to 4.00', () => {
    // Given
    const num = 4.00001;
    const minimumFractionDigits = 2;
    const expectedResult = '4.00';

    // When
    const result = formatNumber({
      num,
      minimumFractionDigits,
    });

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format 3.599999999 to 3.6', () => {
    // Given
    const num = 3.599999999;
    const minimumFractionDigits = 0;
    const maximumFractionDigits = 6;
    const expectedResult = '3.6';

    // When
    const result = formatNumber({
      num,
      minimumFractionDigits,
      maximumFractionDigits,
    });

    // Then
    expect(result).toEqual(expectedResult);
  });
});

describe('roundToClosestWholeNumber', () => {
  test('Should round 4.6 to 5', () => {
    const num = 4.6;
    const expectedResult = '5';

    const result = roundToClosestWholeNumber(num);
    expect(result).toEqual(expectedResult);
  });

  test('Should round 4.4 to 4', () => {
    const num = 4.4;
    const expectedResult = '4';

    const result = roundToClosestWholeNumber(num);
    expect(result).toEqual(expectedResult);
  });

  test('Should round "4.5" to 5', () => {
    const num = '4.5';
    const expectedResult = '5';

    const result = roundToClosestWholeNumber(num);
    expect(result).toEqual(expectedResult);
  });
});
