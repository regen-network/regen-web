import { MouseEvent } from 'react';
import { MapiResponse } from '@mapbox/mapbox-sdk/lib/classes/mapi-response';
import { GeocodeResponse } from '@mapbox/mapbox-sdk/services/geocoding';
import { getResizedImageUrl } from 'utils/image/getResizedImageUrl';

import PhoneIcon from 'web-components/src/components/icons/PhoneIcon';
import StaticMap from 'web-components/src/components/map/StaticMap';
import { Props as ActionCardProps } from 'web-components/src/components/molecules/ActionCard/ActionCard';
import { GalleryItem } from 'web-components/src/components/organisms/Gallery/Gallery.types';
import { Asset } from 'web-components/src/components/sliders/ProjectMedia';
import { Account } from 'web-components/src/components/user/UserInfo';
import { formatDate } from 'web-components/src/utils/format';

import {
  AccountFieldsFragment,
  CreditClass,
  Document,
  Maybe,
  Project,
} from 'generated/graphql';
import {
  AllCreditClassQuery,
  AllProjectPageQuery,
  PrefinanceTimelineItem,
  Project as SanityProject,
} from 'generated/sanity-graphql';
import { UseStateSetter } from 'types/react/use-state';
import { onBtnClick } from 'lib/button';
import {
  AnchoredProjectMetadataBaseLD,
  LegacyProjectMetadataLD,
  NameImageDescription,
  ProjectPageMetadataLD,
  ProjectStakeholder,
} from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';

import {
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/ProfileEdit/ProfileEdit.constants';
import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

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

export const getIsUuid = (str?: string): boolean =>
  !!str &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

type ParseOffChainProjectReturn = {
  offChainProjectMetadata?: ProjectPageMetadataLD & LegacyProjectMetadataLD;
  managementActions?: NameImageDescription[];
  projectDocs?: Maybe<Document>[];
  creditClass?: Maybe<CreditClass>;
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

  const creditClass = project?.creditClassByCreditClassId;
  const creditClassVersion =
    project?.creditClassByCreditClassId?.creditClassVersionsById?.nodes?.[0];

  const creditClassName = creditClassVersion?.name;

  return {
    offChainProjectMetadata,
    managementActions,
    projectDocs,
    creditClass,
    creditClassVersion,
    creditClassName,
  };
};

type ParseMediaParams = {
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

type GetProjectGalleryPhotosProps = {
  offChainProjectMetadata?: ProjectPageMetadataLD &
    AnchoredProjectMetadataBaseLD;
};
export const getProjectGalleryPhotos = ({
  offChainProjectMetadata,
}: GetProjectGalleryPhotosProps) => {
  const photos: GalleryItem[] =
    offChainProjectMetadata?.['regen:galleryPhotos']?.map(photo => ({
      url: getResizedImageUrl({
        url: photo['schema:url'],
        width: 1400,
      }),
      description: photo['schema:caption'],
      credit: photo['schema:creditText'],
    })) ?? [];

  return photos;
};

export function getAccount(
  party?: Maybe<AccountFieldsFragment>,
): Account | undefined {
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
    address: party.addr || '',
    link: party?.websiteLink,
  };
}

const getAccountFromMetadata = (
  metadataRole: ProjectStakeholder,
): Account | undefined => {
  const type = metadataRole?.['@type']?.includes('regen:Organization')
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
    type,
    image: metadataRole?.['schema:image'] || defaultImage,
    location: metadataRole?.['schema:location']?.place_name || '',
    address: metadataRole?.['regen:address'] || '',
    link: metadataRole?.['schema:url'],
  };
};

export function getDisplayAccount(
  metadataRole?: ProjectStakeholder,
  account?: Maybe<AccountFieldsFragment>,
): Account | undefined {
  const dbAccount = getAccount(account);
  if (dbAccount) return dbAccount;
  // If no account info available for this role, check the metadata
  if (metadataRole) return getAccountFromMetadata(metadataRole);
  return undefined;
}

/* formatOtcCardData */

type FormatOtcCardDataParams = {
  data: AllProjectPageQuery['allProjectPage'][0]['otcCard'];
  isConnected: boolean;
  orders?: UISellOrderInfo[];
  hideOtcCard?: boolean;
  setIsBuyFlowStarted: UseStateSetter<boolean>;
};

export const formatOtcCardData = ({
  data,
  isConnected,
  orders = [],
  hideOtcCard,
  setIsBuyFlowStarted,
}: FormatOtcCardDataParams): ActionCardProps | undefined => {
  const isNoteVisible = !isConnected || orders?.length > 0;
  const noteOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isConnected && orders?.length > 0) {
      e.preventDefault();
      setIsBuyFlowStarted(true);
    }
  };

  return hideOtcCard
    ? undefined
    : {
        title: data?.title ?? '',
        description: data?.descriptionRaw ?? '',
        button: {
          text: data?.button?.buttonText ?? '',
          startIcon: <PhoneIcon sx={{ color: 'primary.main' }} />,
          onClick: () => onBtnClick(() => void 0, data?.button),
        },
        image: {
          src: getSanityImgSrc(data?.image),
          alt: data?.image?.imageAlt ?? '',
        },
        note: {
          text: isNoteVisible ? data?.noteRaw ?? '' : '',
          onClick: noteOnClick,
        },
      };
};

export const formatTimelineDates = (item: PrefinanceTimelineItem) =>
  `${formatDate(item.date, 'MMM YYYY')}${
    item.endDate ? ` - ${formatDate(item.endDate, 'MMM YYYY')}` : ''
  }`;

export const getCardSellOrders = (
  sanityFiatSellOrders: SanityProject['fiatSellOrders'],
  sellOrders: UISellOrderInfo[],
) =>
  sanityFiatSellOrders
    ?.map(fiatOrder => {
      const sellOrder = sellOrders.filter(
        cryptoOrder => cryptoOrder.id.toString() === fiatOrder?.sellOrderId,
      )?.[0];
      if (sellOrder) {
        return {
          ...fiatOrder,
          ...sellOrder,
        };
      }
      return null;
    })
    .filter(Boolean) || [];
