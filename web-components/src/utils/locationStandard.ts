import iso3166, { CountryInfo, SubdivisionInfo } from 'iso-3166-2';

import { Option } from '../components/inputs/SelectTextField';

const EXCLUDED_COUNTRIES = ['AQ', 'MQ', 'PR'];
const DEFAULT_COUNTRY = 'US';
const POSTAL_CODE_MAX_LENGTH = 64;

/**
 * Function to get the countries raw data as a map from `iso3166`
 */
const getIsoCountries = (): CountryInfo.Map => iso3166.data;

/**
 * Function to get the list of countries iso codes
 */
const getCountriesIsoCodes = (): string[] => Object.keys(getIsoCountries());

/**
 * Function to get the country object by code or name from `iso3166`
 */
const getIsoCountry = (countryCodeOrName: string): CountryInfo.Full | null =>
  iso3166.country(countryCodeOrName);

/**
 * Function to get the subdivision object by full code or partial country code
 * and partial subdivision code/name from `iso3166`
 */
interface IsoSubdivisionProps {
  code?: string; // full subdivision code
  country?: string; // country code (partial 1)
  subdivision?: string; // subdivion code / name (partial 2)
}

export const getIsoSubdivision = ({
  code,
  country,
  subdivision,
}: IsoSubdivisionProps): SubdivisionInfo.Full | null => {
  if (code) return iso3166.subdivision(code);
  if (country && subdivision) return iso3166.subdivision(country, subdivision);
  return null;
};

/**
 * Function to get the country name by country code directly from raw data
 */
export const getCountryNameByCode = (code: string): string =>
  // iso3166.country(code)?.name;
  getIsoCountries()[code].name;

// Util function to prepare jurisdiction ISO code
// based on package iso-3166-2

type LocationType = {
  country: string; // iso 3166-1 alpha 2 (ie. US)
  stateProvince?: string; // iso 3166-2 (ie. US-CO)
  postalCode?: string;
};

export const getJurisdictionIsoCode = ({
  country,
  stateProvince,
  postalCode,
}: LocationType): string => {
  // check iso country
  // eslint-disable-next-line lingui/no-unlocalized-strings
  if (!getIsoCountry(country)) throw new Error(`Invalid country: ${country}`);
  // check subdivision exists, also iso subdivision (failing search is an empty object)
  if (!stateProvince || !getIsoSubdivision({ code: stateProvince })?.code)
    return country;
  // TODO - text fields allow whitespace strings..
  // The trim must be done before the check, since an empty string
  // returns false, but a string with whitespace returns true.
  const _postalCode = postalCode?.trim();
  // check postal code exists and valid length
  if (!_postalCode || _postalCode.length > POSTAL_CODE_MAX_LENGTH)
    return stateProvince;
  return `${stateProvince} ${_postalCode}`;
};

/**
 * Utility function to obtain the list of country options according
 * to the iso-3166-2 package, for the selector type input.
 * By default it is initialized with the selection in US. It also places
 * the default country as the first option in the list, after the placeholder.
 */

interface CountryOptionsProps {
  countryLabelPlaceholder: string;
  exclude?: boolean;
}

// isIncluded means that we keep it included because it is not in excluded list
const isIncluded = (code: string): boolean => {
  return !EXCLUDED_COUNTRIES.includes(code);
};

export function getCountryOptions({
  countryLabelPlaceholder,
  exclude = false,
}: CountryOptionsProps): Option[] {
  const countriesCodes = exclude
    ? getCountriesIsoCodes().filter(isIncluded)
    : getCountriesIsoCodes();

  const countries = countriesCodes
    .map(key => ({
      value: key,
      label: getCountryNameByCode(key),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const defaultCountry = countries.find(
    country => country.value === DEFAULT_COUNTRY,
  );
  const otherCountries = countries.filter(
    country => country.value !== DEFAULT_COUNTRY,
  );

  let options = [
    {
      value: '',
      label: countryLabelPlaceholder,
    },
  ];
  if (defaultCountry) options.push(defaultCountry);
  options.push(...otherCountries);

  return options;
}

/**
 * Utility function to obtain the list of options of the subdivisions
 * (aka. state/region) corresponding to a country, according to the
 * iso-3166-2 package, for the selector type input.
 */

export function getCountrySubdivisionOptions(
  country: string,
  placeholderLabel: string,
): Option[] {
  const countrySubdivisions = getIsoCountry(country);

  const options: Option[] = Object.keys(countrySubdivisions?.sub || {})
    .map(isoCode => ({
      value: isoCode,
      label: `${countrySubdivisions?.sub[isoCode].name} (${countrySubdivisions?.sub[isoCode].type})`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  if (options.length > 0)
    options.unshift({
      value: '',
      label: placeholderLabel,
    });

  return options;
}

/**
 * Function to check if country names matches in lower case
 */

const isValidCountryName = (
  countryName: string,
  countryCode: string,
): boolean => {
  return (
    getCountryNameByCode(countryCode).toLowerCase() ===
    countryName.toLowerCase()
  );
};

/**
 * Function to get the country code by name, doing some specific checks
 */
export const getCountryCodeByName = (countryName: string): string => {
  const foundCode = getCountriesIsoCodes().find(countryCode => {
    return isValidCountryName(countryName, countryCode);
  });
  if (foundCode) return foundCode;

  // TODO: iso3166 did not pick up these US variants. May need to add more data sources.
  const isUnitedStates = /United States|USA|U.S./.test(countryName);
  if (isUnitedStates) return 'US';

  return '';
};
