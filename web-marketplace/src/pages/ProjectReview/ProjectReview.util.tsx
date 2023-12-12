import { DeliverTxResponse } from '@cosmjs/stargate';

import {
  getCountryCodeByName,
  getISOString,
  getIsoSubdivision,
} from 'web-components/src/utils/locationStandard';

import {
  AnchoredProjectMetadataBaseLD,
  CFCProjectMetadataLD,
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from 'lib/db/types/json-ld';
import { isCFCCreditClass, isVCSCreditClass } from 'lib/ecocredit/api';

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

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
  metadata: Partial<AnchoredProjectMetadataBaseLD>,
): Promise<string | undefined> => {
  if (!mapboxToken) return Promise.reject('Missing map API token');
  let isoString;
  const location = metadata?.['schema:location'];
  if (!location?.['context'] && !location?.['place_name']) {
    return Promise.reject('Please select a location for this project.');
  }
  const context: any[] = location?.['context'] || [];
  let countryKey = '';
  let stateProvince = '';
  let postalCode = '';
  if (Array.isArray(context)) {
    context.forEach(ctx => {
      if (ctx?.['id'].includes('country')) {
        countryKey = getCountryCodeByName(ctx?.['text'].trim());
        return;
      }
      if (ctx?.['id'].includes('region')) {
        stateProvince = ctx?.['text'];
        return;
      }
      if (ctx?.['id'].includes('postcode')) {
        postalCode = ctx?.['text'];
        return;
      }
    });
  }

  // if GeocodeFeature context is insufficient, we can get a country code from place_name
  if (!countryKey && location?.['place_name']) {
    const placeSegments = location['place_name'].split(',');
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
    const placeSegments = location['place_name'].split(',');

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
  metadata: Partial<ProjectMetadataLD>,
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
