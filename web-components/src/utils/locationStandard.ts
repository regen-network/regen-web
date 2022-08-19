import MapboxClient from '@mapbox/mapbox-sdk';
import mbxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';
import iso3166 from 'iso-3166-2';

/**
 * Fetches from mapbox to compose a proper ISO 3166-2 standard location string
 */
export const getISOString = async (
  accessToken: string,
  location: {
    countryKey?: string;
    stateProvince?: string;
    postalCode?: string;
  },
): Promise<string | undefined> => {
  const { countryKey, stateProvince, postalCode } = location;
  if (!countryKey || !accessToken)
    return Promise.reject(
      'Geocoding service is unavailable: missing `countryKey` or `accessToken`',
    );
  if (!stateProvince) {
    return Promise.resolve(countryKey); // no need to search
  }
  const baseClient = MapboxClient({ accessToken });
  const geocoderService = mbxGeocoder(baseClient);
  let placeCode: string | undefined;

  await geocoderService
    .forwardGeocode({
      mode: 'mapbox.places',
      query: `${iso3166.data[countryKey].name}+${stateProvince}`,
      types: ['country', 'region'],
    })
    .send()
    .then(res => {
      const placeCodes = res?.body?.features
        ?.filter((f: any) => !!f?.properties?.short_code)
        .sort((p: any) => p.relevance);

      const result = placeCodes?.[0]?.properties?.short_code || '';
      if (!!result) {
        placeCode = result;
        const isResultValid = countryKey.toUpperCase() !== result.toUpperCase();
        if (isResultValid && postalCode) placeCode += ` ${postalCode}`;
      }
    });

  // If country-only, mapbox returns lowercase ('us'), so need toUppercase here for ledger
  return Promise.resolve(placeCode?.toUpperCase());
};

// Util function to prepare jurisdiction ISO code
// based on package iso-3166-2

type LocationType = {
  country: string;
  stateProvince?: string;
  postalCode?: string;
};

export const getJurisdictionIsoCode = ({
  country, // US
  stateProvince, // US-CO
  postalCode,
}: LocationType): string => {
  let jurisdiction = '';

  // check iso country
  const validCountry = iso3166.country(country);
  if (!validCountry) return jurisdiction;

  jurisdiction = country;

  // check subdivision exists
  if (!stateProvince) return jurisdiction;

  // check iso subdivision
  const validSubdivision = iso3166.subdivision(stateProvince);
  if (!validSubdivision) return jurisdiction;

  // TODO - text fields allow whitespace strings..
  const _postalCode = postalCode?.trim();

  // check postal code exists
  if (_postalCode) {
    jurisdiction = `${stateProvince} ${_postalCode}`;
  } else {
    jurisdiction = stateProvince as string;
  }

  return jurisdiction;
};
