'use client';
import type { MapiResponse } from '@mapbox/mapbox-sdk/lib/classes/mapi-response';
import type { GeocodeResponse } from '@mapbox/mapbox-sdk/services/geocoding';
import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

import { Asset } from 'web-components/src/components/sliders/ProjectMedia';

import {
  AnchoredProjectMetadataBaseLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  MAPBOX_TOKEN,
} from './ProjectDetails.config';

const StaticMap = dynamic(
  () => import('web-components/src/components/map/StaticMap'),
  {
    loading: () => <CircularProgress color="secondary" />,
    ssr: false,
  },
);

export type ParseMediaParams = {
  offChainProjectMetadata?: Pick<
    ProjectPageMetadataLD,
    'regen:galleryPhotos' | 'regen:previewPhoto' | 'schema:creditText'
  >;
  onChainProjectMetadata?: AnchoredProjectMetadataBaseLD;
  geojson: any;
  geocodingJurisdictionData?: MapiResponse<GeocodeResponse> | null;
};

type ParseMediaReturn = {
  assets: Asset[];
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
  imageCredits?: string;
};

export const parseMedia = ({
  offChainProjectMetadata,
  onChainProjectMetadata,
  geojson,
  geocodingJurisdictionData,
}: ParseMediaParams): ParseMediaReturn => {
  let assets: Asset[] = [];

  const previewPhotoUrl =
    offChainProjectMetadata?.['regen:previewPhoto']?.['schema:url'] ||
    onChainProjectMetadata?.['regen:previewPhoto']?.['schema:url'];
  const previewPhotoCredit =
    offChainProjectMetadata?.['regen:previewPhoto']?.['schema:creditText'] ||
    onChainProjectMetadata?.['regen:previewPhoto']?.['schema:creditText'];

  const jurisdictionFallback = geocodingJurisdictionData?.body.features?.[0];

  if (previewPhotoUrl) {
    assets.push({ src: previewPhotoUrl, type: 'image' });
  }

  if (geojson || jurisdictionFallback) {
    assets.push(
      <StaticMap
        geojson={geojson ?? jurisdictionFallback}
        mapboxToken={MAPBOX_TOKEN}
      />,
    );
  }

  return {
    assets: assets ?? [],
    imageStorageBaseUrl: IMAGE_STORAGE_BASE_URL,
    apiServerUrl: API_URI,
    imageCredits: previewPhotoCredit,
  };
};
