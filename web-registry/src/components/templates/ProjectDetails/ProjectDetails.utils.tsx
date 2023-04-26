import StaticMap from 'web-components/lib/components/map/StaticMap';
import { GalleryPhoto } from 'web-components/lib/components/organisms/Gallery/Gallery.types';
import { Asset } from 'web-components/lib/components/sliders/ProjectMedia';
import { Party } from 'web-components/lib/components/user/UserInfo';

import {
  Document,
  Maybe,
  PartyFieldsFragment,
  Project,
} from 'generated/graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  LegacyProjectMetadataLD,
  NameImageDescription,
  ProjectPageMetadataLD,
  ProjectStakeholder,
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

  const previewPhoto = metadata?.['regen:previewPhoto'];

  if (previewPhoto?.['schema:url']) {
    assets.push({ src: previewPhoto['schema:url'], type: 'image' });
  }

  if (geojson) {
    assets.push(<StaticMap geojson={geojson} mapboxToken={MAPBOX_TOKEN} />);
  }

  return {
    assets: assets ?? [],
    imageStorageBaseUrl: IMAGE_STORAGE_BASE_URL,
    apiServerUrl: API_URI,
    imageCredits: previewPhoto?.['schema:creditText'],
  };
};

type GetProjectGalleryPhotosProps = {
  offChainProjectMetadata?: ProjectPageMetadataLD &
    AnchoredProjectMetadataBaseLD;
};
export const getProjectGalleryPhotos = ({
  offChainProjectMetadata,
}: GetProjectGalleryPhotosProps) => {
  const photos: GalleryPhoto[] =
    offChainProjectMetadata?.['regen:galleryPhotos']?.map(photo => ({
      href: photo['schema:url'],
      caption: photo['schema:caption'],
      credit: photo['schema:creditText'],
    })) ?? [];

  return photos;
};

export function getParty(
  party?: Maybe<PartyFieldsFragment>,
): Party | undefined {
  if (!party) {
    return undefined;
  }

  return {
    name: party.name,
    description: party.description,
    type: party.type,
    image: party.image,
    address: party.walletByWalletId?.addr || '',
    link: party?.websiteLink,
  };
}

type StakeholderType =
  | 'regen:projectDeveloper'
  | 'regen:landSteward'
  | 'regen:landOwner'
  | 'regen:projectOriginator';

const getPartyFromMetadata = (
  metadata: AnchoredProjectMetadataBaseLD,
  role: StakeholderType,
): Party | undefined => {
  const metadataRole: ProjectStakeholder | undefined = metadata[role];
  if (!metadataRole) return undefined;

  return {
    name: metadataRole?.['schema:name'] || '',
    description: metadataRole?.['schema:description'] || '',
    type: metadataRole?.['@type'].includes('regen:Organization') // covers Organization or OrganizationDisplay
      ? 'ORGANIZATION' // to provide default image
      : 'USER',
    image: metadataRole?.['schema:image'],
    location: metadataRole?.['schema:location']?.place_name || '',
    address: metadataRole?.['regen:adress'] || '',
    link: metadataRole?.['schema:url'] || '',
  };
};

export function getDisplayParty(
  role: StakeholderType,
  metadata?: AnchoredProjectMetadataBaseLD,
  party?: Maybe<PartyFieldsFragment>,
): Party | undefined {
  const showOnProjectPage = metadata?.[role]?.['regen:showOnProjectPage'];
  if (showOnProjectPage) {
    const dbParty = getParty(party);
    if (dbParty) return dbParty;
    // If no party info available for this role, check the metadata
    return getPartyFromMetadata(metadata, role);
  }
  return undefined;
}
