import { DeliverTxResponse } from '@cosmjs/stargate';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import { countries } from 'web-components/lib/utils/countries';
import { getISOString } from 'web-components/lib/utils/locationStandard';

import {
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from '../../generated/json-ld';

const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

export const getOnChainProjectId = (
  deliverTxResponse?: DeliverTxResponse,
): string => {
  if (!deliverTxResponse?.rawLog) return '';
  const rawLog = JSON.parse(deliverTxResponse?.rawLog);
  // regen.ecocredit.v1.EventCreateProject
  const event = rawLog?.[0]?.events?.find((event: any) =>
    event?.type?.includes('EventCreateProject'),
  );
  const projectId = event?.attributes
    ?.find((attribute: any) => attribute?.key === 'project_id')
    ?.value?.replace(/['"]+/g, '');
  return projectId;
};

export const getJurisdiction = async (
  metadata: Partial<ProjectMetadataLD> | Partial<VCSProjectMetadataLD>,
): Promise<string | undefined> => {
  if (!mapboxToken) return Promise.reject('Missing map API token');
  let isoString;
  const location = metadata?.['schema:location'];
  if (!location?.context || !location?.place_name) {
    return Promise.reject('Please select a location for this project.');
  }
  const context: GeocodeFeature[] = location?.context || [];
  let countryKey = '';
  let stateProvince = '';
  let postalCode = '';
  context.forEach(ctx => {
    if (ctx.id.includes('country')) {
      countryKey = getCountryKey(ctx.text);
      return;
    }
    if (ctx.id.includes('region')) {
      stateProvince = ctx.text;
      return;
    }
    if (ctx.id.includes('postcode')) {
      postalCode = ctx.text;
      return;
    }
  });

  // if GeocodeFeature context is insufficient, we can get a country code from place_name
  if (!countryKey && location?.place_name) {
    const placeSegments = location.place_name.split(',');
    // find the country key
    placeSegments.forEach(segment => {
      const foundKey = getCountryKey(segment);
      if (foundKey) {
        countryKey = foundKey;
        return;
      }
    });
  }

  try {
    isoString = await getISOString(mapboxToken, {
      countryKey,
      stateProvince,
      postalCode,
    });
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve(isoString);
};

const getCountryKey = (country: string): string => {
  const foundKey = Object.keys(countries).find(key => {
    return countries[key].toLowerCase() === country.trim().toLowerCase();
  });
  if (foundKey) return foundKey;
  return '';
};
