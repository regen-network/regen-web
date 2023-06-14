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
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/ProfileEdit/ProfileEdit.constants';

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
  // TODO: make use of getDefaultAvatar from ProfileEdit.utils.ts
  let image: string;
  if (!!party.image) {
    image = party.image;
  } else if (!party.image && party.type === 'USER') {
    image = DEFAULT_PROFILE_USER_AVATAR;
  } else {
    image = DEFAULT_PROFILE_COMPANY_AVATAR;
  }

  return {
    name: party.name,
    description: party.description,
    type: party.type,
    image: image,
    address: party.walletByWalletId?.addr || '',
    link: party?.websiteLink,
  };
}

type StakeholderType =
  | 'regen:projectDeveloper'
  | 'regen:projectVerifier'
  | 'regen:landSteward'
  | 'regen:landOwner'
  | 'regen:projectOriginator';

const getPartyFromMetadata = (
  metadata: AnchoredProjectMetadataBaseLD,
  role: StakeholderType,
): Party | undefined => {
  const metadataRole: ProjectStakeholder | undefined = metadata[role];
  if (!metadataRole) return undefined;
  const type = metadataRole?.['@type'].includes('regen:Organization')
    ? 'ORGANIZATION'
    : 'USER';
  let defaultImage: string;
  if (type === 'USER') {
    defaultImage = DEFAULT_PROFILE_USER_AVATAR;
  } else {
    defaultImage = DEFAULT_PROFILE_COMPANY_AVATAR;
  }

  return {
    name: metadataRole?.['schema:name'] || '',
    description: metadataRole?.['schema:description'] || '',
    type: type,
    image: metadataRole?.['schema:image'] || defaultImage,
    location: metadataRole?.['schema:location']?.place_name || '',
    address: metadataRole?.['regen:address'] || '',
    link: metadataRole?.['schema:url'],
  };
};

export function getDisplayParty(
  role: StakeholderType,
  metadata?: AnchoredProjectMetadataBaseLD,
  party?: Maybe<PartyFieldsFragment>,
): Party | undefined {
  const dbParty = getParty(party);
  if (dbParty) return dbParty;
  // If no party info available for this role, check the metadata
  if (metadata) return getPartyFromMetadata(metadata, role);
  return undefined;
}
