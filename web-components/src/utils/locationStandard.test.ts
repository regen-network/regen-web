import { getJurisdictionIsoCode } from './locationStandard';

describe('Location Standard utilities module', () => {
  describe('Jurisdiction ISO code function', () => {
    test('an invalid country throws an error', () => {
      const wrongCountry = (): string | Error =>
        getJurisdictionIsoCode({
          country: 'Regenland',
        });
      expect(wrongCountry).toThrow(Error);
    });

    test('undefined, wrong or incomplete subdivision code returns the country', () => {
      const undefinedSubdivision = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: undefined,
      });
      expect(undefinedSubdivision).toBe('US');

      const wrongSubdivision = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: '',
      });
      expect(wrongSubdivision).toBe('US');

      const incompleteSubdivision = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: 'CO',
      });
      expect(incompleteSubdivision).toBe('US');
    });

    test('subdivision iso 3166-2 code when povided', () => {
      const withSubdivision = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: 'US-CO',
      });
      expect(withSubdivision).toBe('US-CO');
    });

    test('iso 3166-2 with postal code, if length is valid', () => {
      const postalCode = '12345 67890';

      const withPostalCode = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: 'US-CO',
        postalCode: postalCode,
      });
      expect(withPostalCode).toBe(`US-CO ${postalCode}`);

      const withLongPostalCode = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: 'US-CO',
        postalCode: postalCode.repeat(10), // more than 64
      });
      expect(withLongPostalCode).toBe('US-CO');

      const whitespacePostalCode = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: 'US-CO',
        postalCode: '    ',
      });
      expect(whitespacePostalCode).toBe('US-CO');

      const startEndWhitespacePostalCode = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: 'US-CO',
        postalCode: `  ${postalCode}   `,
      });
      expect(startEndWhitespacePostalCode).toBe(`US-CO ${postalCode}`);
    });

    test('just the country code if subdivision is missing', () => {
      const undefinedSubdivision = getJurisdictionIsoCode({
        country: 'US',
        stateProvince: undefined,
        postalCode: '12345',
      });
      expect(undefinedSubdivision).toBe('US');
    });
  });
});
