import { DeliverTxResponse } from '@cosmjs/stargate';

import {
  getCountryCodeByName,
  getISOString,
  getIsoSubdivision,
} from 'web-components/lib/utils/locationStandard';

import { isCFCCreditClass, isVCSCreditClass } from 'lib/ecocredit/api';

import {
  CFCProjectMetadataLD,
  ProjectMetadataLDUnion,
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
  metadata: Partial<ProjectMetadataLDUnion>,
): Promise<string | undefined> => {
  if (!mapboxToken) return Promise.reject('Missing map API token');
  let isoString;
  const location = metadata?.['schema:location'];
  if (!location?.['geojson:context'] && !location?.['geojson:place_name']) {
    return Promise.reject('Please select a location for this project.');
  }
  const context: any[] = location?.['geojson:context'] || [];
  let countryKey = '';
  let stateProvince = '';
  let postalCode = '';
  context.forEach(ctx => {
    if (ctx?.['geojson:id'].includes('country')) {
      countryKey = getCountryCodeByName(ctx?.['geojson:text'].trim());
      return;
    }
    if (ctx?.['geojson:id'].includes('region')) {
      stateProvince = ctx?.['geojson:text'];
      return;
    }
    if (ctx?.['geojson:id'].includes('postcode')) {
      postalCode = ctx?.['geojson:text'];
      return;
    }
  });

  // if GeocodeFeature context is insufficient, we can get a country code from place_name
  if (!countryKey && location?.['geojson:place_name']) {
    const placeSegments = location['geojson:place_name'].split(',');
    // find the country key
    placeSegments.forEach((segment: string) => {
      const foundCountry = getCountryCodeByName(segment.trim());
      if (foundCountry) {
        countryKey = foundCountry;
        return;
      }
    });
  }

  if (countryKey && !stateProvince) {
    const placeSegments = location['geojson:place_name'].split(',');

    placeSegments.forEach((segment: string) => {
      const foundStateProvince = getStateProvince(countryKey, segment.trim());
      if (foundStateProvince) {
        stateProvince = foundStateProvince;
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
    // eslint-disable-next-line no-console
    console.log(
      'Jurisdiction ISO string based on location provided:',
      isoString,
    );
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve(isoString);
};

const getStateProvince = (
  countryKey: string,
  stateProvince: string,
): string | undefined => {
  const subdivision = getIsoSubdivision({
    country: countryKey,
    subdivision: stateProvince,
  });
  return subdivision?.name;
};

// TODO: Handle for all cases: regen-network/regen-registry#1104
export const getProjectReferenceID = (
  metadata: Partial<ProjectMetadataLDUnion>,
  creditClassId?: string | null,
): string => {
  if (!creditClassId) return '';
  const isVCS = isVCSCreditClass(creditClassId);
  const vcsProjectId = (metadata as Partial<VCSProjectMetadataLD>)?.[
    'regen:vcsProjectId'
  ];
  if (isVCS && vcsProjectId) return `VCS-${vcsProjectId}`;
  const isCFC = isCFCCreditClass(creditClassId);
  const cfcProjectId = (metadata as Partial<CFCProjectMetadataLD>)?.[
    'regen:cfcProjectId'
  ];
  if (isCFC && cfcProjectId) return `CFC-${cfcProjectId}`;
  return '';
};
