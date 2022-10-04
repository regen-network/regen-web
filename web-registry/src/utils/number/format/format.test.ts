import {
  floorFloatNumber,
  FloorFloatNumberParamsOptions,
  roundFloatNumber,
  RoundFloatNumberParamsOptions,
} from './format';

describe('roundFloatNumber', () => {
  test('Should format number to 2 decimals by default', () => {
    // Given
    const number = 1.123;
    const expectedResult = 1.12;

    // When
    const result = roundFloatNumber(number);

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format number to 0 decimal', () => {
    // Given
    const number = 1.123;
    const expectedResult = 1;
    const options: RoundFloatNumberParamsOptions = {
      decimals: 0,
    };

    // When
    const result = roundFloatNumber(number, options);

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format number to 1 decimal', () => {
    // Given
    const number = 1.123;
    const expectedResult = 1.1;
    const options: RoundFloatNumberParamsOptions = {
      decimals: 1,
    };

    // When
    const result = roundFloatNumber(number, options);

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format number to 2 decimal', () => {
    // Given
    const number = 1.123;
    const expectedResult = 1.12;
    const options: RoundFloatNumberParamsOptions = {
      decimals: 2,
    };

    // When
    const result = roundFloatNumber(number, options);

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format number to 2 decimal and round above', () => {
    // Given
    const number = 1.126;
    const expectedResult = 1.13;
    const options: RoundFloatNumberParamsOptions = {
      decimals: 2,
    };

    // When
    const result = roundFloatNumber(number, options);

    // Then
    expect(result).toEqual(expectedResult);
  });
});

describe('floorFloatNumber', () => {
  test('Should format number to 2 decimals by default', () => {
    // Given
    const number = 1.123;
    const expectedResult = 1.12;

    // When
    const result = floorFloatNumber(number);

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format number to 0 decimal', () => {
    // Given
    const number = 1.123;
    const expectedResult = 1;
    const options: FloorFloatNumberParamsOptions = {
      decimals: 0,
    };

    // When
    const result = floorFloatNumber(number, options);

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format number to 1 decimal', () => {
    // Given
    const number = 1.183;
    const expectedResult = 1.1;
    const options: FloorFloatNumberParamsOptions = {
      decimals: 1,
    };

    // When
    const result = floorFloatNumber(number, options);

    // Then
    expect(result).toEqual(expectedResult);
  });

  test('Should format number to 2 decimal', () => {
    // Given
    const number = 1.128;
    const expectedResult = 1.12;
    const options: FloorFloatNumberParamsOptions = {
      decimals: 2,
    };

    // When
    const result = floorFloatNumber(number, options);

    // Then
    expect(result).toEqual(expectedResult);
  });
});
