import StaticMap from 'web-components/lib/components/map/StaticMap';
import { Asset } from 'web-components/lib/components/sliders/ProjectMedia';

import { Document, Event, Maybe, Project } from 'generated/graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  LegacyProjectMetadataLD,
  NameImageDescription,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  MAPBOX_TOKEN,
} from './ProjectDetails.config';

type FindSanityCreditClassParams = {
  sanityCreditClassData: AllCreditClassQuery | undefined;
  creditClassIdOrUrl: string;
};

export const findSanityCreditClass = ({
  sanityCreditClassData,
  creditClassIdOrUrl,
}: FindSanityCreditClassParams):
  | AllCreditClassQuery['allCreditClass'][0]
  | undefined => {
  const creditClass = sanityCreditClassData?.allCreditClass?.find(creditClass =>
    creditClassIdOrUrl?.includes(creditClass.path ?? ''),
  );

  return creditClass;
};

export const getIsOnChainId = (projectId?: string): boolean =>
  !!projectId && /([A-Z]{1}[\d]+)([-])([\d{3,}])\w+/.test(projectId);

type ParseOffChainProjectReturn = {
  offChainProjectMetadata?: ProjectPageMetadataLD & LegacyProjectMetadataLD;
  managementActions?: NameImageDescription[];
  projectEvents?: Maybe<Event>[];
  projectDocs?: Maybe<Document>[];
  creditClassVersion?: any;
  creditClassName?: string;
  coBenefitsIris?: string[];
  primaryImpactIRI?: string;
};

export const parseOffChainProject = (
  project?: Maybe<Project>,
): ParseOffChainProjectReturn => {
  const offChainProjectMetadata = project?.metadata;
  const managementActions =
    offChainProjectMetadata?.['regen:landManagementActions'];

  const projectEvents = project?.eventsByProjectId?.nodes;
  const projectDocs = project?.documentsByProjectId?.nodes;

  const creditClassVersion =
    project?.creditClassByCreditClassId?.creditClassVersionsById?.nodes?.[0];

  const creditClassName = creditClassVersion?.name;
  const coBenefitsIris =
    creditClassVersion?.metadata?.['regen:coBenefits']?.map(
      (impact: { '@id': string }) => impact['@id'],
    ) || [];
  const primaryImpactIRI =
    creditClassVersion?.metadata?.['regen:indicator']?.['@id'];
  return {
    offChainProjectMetadata,
    managementActions,
    projectEvents,
    projectDocs,
    creditClassVersion,
    creditClassName,
    coBenefitsIris,
    primaryImpactIRI,
  };
};

type ParseMediaParams = {
  metadata?: Pick<
    ProjectPageMetadataLD,
    'regen:galleryPhotos' | 'regen:previewPhoto' | 'schema:creditText'
  >;
  geojson: any;
};

type ParseMediaReturn = {
  assets: Asset[];
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
  imageCredits?: string;
};

export const parseMedia = ({
  metadata,
  geojson,
}: ParseMediaParams): ParseMediaReturn => {
  let assets: Asset[] = [];

  const galleryPhotos = metadata?.['regen:galleryPhotos']?.filter(Boolean);
  const previewPhoto = metadata?.['regen:previewPhoto'];
  const noGallery = !galleryPhotos || galleryPhotos?.length === 0;
  const noGalleryAssets: Asset[] = [];

  if (previewPhoto) {
    noGalleryAssets.push({ src: previewPhoto, type: 'image' });
  }

  assets = noGallery
    ? noGalleryAssets
    : galleryPhotos.map(photo => ({
        src: photo,
        type: 'image',
      }));

  if (geojson && assets.length < 2) {
    assets.push(<StaticMap geojson={geojson} mapboxToken={MAPBOX_TOKEN} />);
  }

  return {
    assets: assets ?? [],
    imageStorageBaseUrl: IMAGE_STORAGE_BASE_URL,
    apiServerUrl: API_URI,
    imageCredits: metadata?.['schema:creditText'],
  };
};
