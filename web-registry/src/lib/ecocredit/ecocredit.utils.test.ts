import { getV1AlphaBatchDenom } from './ecocredit.utils';

describe('getV1AlphaBatchDenom', () => {
  it('should extract C01-002-20190101-20191231-001 denom correctly', () => {
    // Given
    const input = 'C01-002-20190101-20191231-001';
    const expectedResult = 'C01-20190101-20191231-001';

    // When
    const result = getV1AlphaBatchDenom(input);

    // Then
    expect(result).toEqual(expectedResult);
  });

  it('should extract C01-001-20150101-20151231-002 denom correctly', () => {
    // Given
    const input = 'C01-001-20150101-20151231-002';
    const expectedResult = 'C01-20150101-20151231-002';

    // When
    const result = getV1AlphaBatchDenom(input);

    // Then
    expect(result).toEqual(expectedResult);
  });

  it('should extract C01-001-20150101-20151231-005 denom correctly', () => {
    // Given
    const input = 'C01-001-20150101-20151231-005';
    const expectedResult = 'C01-20150101-20151231-005';

    // When
    const result = getV1AlphaBatchDenom(input);

    // Then
    expect(result).toEqual(expectedResult);
  });
});
