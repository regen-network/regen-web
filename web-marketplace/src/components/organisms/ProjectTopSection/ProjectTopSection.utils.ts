/* parseMethodologies */
import {
  RoundLogoItemsListType,
  RoundLogoItemType,
} from 'web-components/lib/components/molecules/RoundLogoItemsList/RoundLogoItemsList.types';
import { ImageType } from 'web-components/lib/types/shared/imageType';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { ImageFieldsFragment, Sdg } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataLD,
  LegacyProjectMetadataLD,
  ProjectPageMetadataLD,
  ProjectQuote,
} from 'lib/db/types/json-ld';
import { Certification } from 'lib/db/types/json-ld/certification';
import { ApprovedMethodologies } from 'lib/db/types/json-ld/methodology';
import { Rating } from 'lib/db/types/json-ld/rating';
import { getSanityImgSrc } from 'lib/imgSrc';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

import {
  CERTIFICATIONS,
  RATINGS,
  SEE_ALL_METHODOLOGIES,
} from './ProjectTopSection.constants';

type GetSdgsImagesParams = {
  sdgs?: Maybe<Maybe<Sdg>[]>;
};

export const getSdgsImages = ({ sdgs }: GetSdgsImagesParams) => {
  const sdgsImages: ImageType[] =
    sdgs?.map(sdg => ({
      src: getSanityImgSrc(sdg?.image),
      alt: String(sdg?.title ?? ''),
    })) ?? [];

  return sdgsImages;
};
type ParseMethodologiesParams = {
  methodologies?: ApprovedMethodologies;
};

export const parseMethodologies = ({
  methodologies,
}: ParseMethodologiesParams) => {
  if (
    methodologies?.['schema:url'] &&
    methodologies?.['schema:itemListElement'].length > 1
  ) {
    return {
      'schema:name': SEE_ALL_METHODOLOGIES,
      'schema:url': methodologies?.['schema:url'],
    };
  }

  return methodologies?.['schema:itemListElement']?.[0];
};

/* parseProjectMetadata */

type ParseProjectMetadataReturn = {
  projectName?: string;
  area?: number;
  areaUnit?: string;
  placeName?: string;
  projectMethodology?: ProjectMethodology;
  ratings?: Rating[];
};

export type ProjectMethodology = {
  'schema:name': string;
  'schema:url'?: string;
};

export const parseProjectMetadata = (
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD,
  onChainProjectId?: string,
): ParseProjectMetadataReturn => {
  const projectName = projectMetadata?.['schema:name'];
  const projectSize = projectMetadata?.['regen:projectSize'];
  const area = projectSize?.['qudt:numericValue'];
  const unit = projectSize?.['qudt:unit'];
  const areaUnit = getAreaUnit(unit as qudtUnit);
  const placeName = projectMetadata?.['schema:location']?.['place_name'];
  let projectMethodology;
  let ratings;

  if (isAnchoredProjectMetadata(projectMetadata, onChainProjectId)) {
    // Methodology
    projectMethodology =
      projectMetadata?.['regen:vcsMethodology'] ??
      projectMetadata?.['regen:offsetProtocol'] ??
      parseMethodologies({
        methodologies: projectMetadata?.['regen:approvedMethodologies'],
      });

    // Rating
    ratings = projectMetadata?.['regen:ratings'];
  }
  // projectMetadata?.['schema:location']?.['geojson:place_name'];

  return {
    projectName,
    area,
    areaUnit,
    placeName,
    projectMethodology,
    ratings,
  };
};

/* parseProjectPageMetadata */

type ParseProjectPageMetadataReturn = {
  glanceText?: string[];
  primaryDescription?: string;
  quote?: ProjectQuote;
};

export const parseProjectPageMetadata = (
  projectPageMetadata?: Partial<ProjectPageMetadataLD>,
): ParseProjectPageMetadataReturn => {
  const glanceText = projectPageMetadata?.['regen:glanceText'];
  const primaryDescription =
    projectPageMetadata?.['regen:landStory'] ||
    projectPageMetadata?.['schema:description'];
  const quote = projectPageMetadata?.['regen:projectQuote'];

  return {
    glanceText,
    primaryDescription,
    quote,
  };
};

/* parseOffChainProject  */

export const parseOffChainProject = (
  project?: Maybe<ProjectFieldsFragment>,
) => {
  const creditClass = project?.creditClassByCreditClassId;
  const creditClassVersion = creditClass?.creditClassVersionsById?.nodes?.[0];
  const offChainCoBenefitsIRIs =
    creditClassVersion?.metadata?.['regen:coBenefits']?.map(
      (impact: { '@id': string }) => impact['@id'],
    ) || [];
  const offChainPrimaryImpactIRI =
    creditClassVersion?.metadata?.['regen:indicator']?.['@id'];

  return {
    offChainPrimaryImpactIRI,
    offChainCoBenefitsIRIs,
  };
};

export const isAnchoredProjectMetadata = (
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD,
  onChainProjectId?: string,
): projectMetadata is AnchoredProjectMetadataLD => {
  return !!onChainProjectId;
};

/* getIconsMapping */

type SanityItemType = {
  name?: Maybe<string>;
  icon?: ImageFieldsFragment | null;
};

type GetIconsMappingParams = {
  data?: SanityItemType[];
};

export const getIconsMapping = ({ data }: GetIconsMappingParams) => {
  return data?.reduce((acc, item) => {
    acc[item?.name?.toLocaleLowerCase() ?? ''] = String(item?.icon?.asset?.url);
    return acc;
  }, {} as Record<string, string | undefined>);
};

/* getRatingAndCertificationsData */

type GetRatingAndCertificationsDataParams = {
  ratings?: Rating[];
  ratingIcons?: Record<string, string | undefined>;
  certifications?: Certification[];
  certificationIcons?: Record<string, string | undefined>;
};

export const getRatingsAndCertificationsData = ({
  ratings,
  ratingIcons,
  certifications,
  certificationIcons,
}: GetRatingAndCertificationsDataParams):
  | RoundLogoItemsListType
  | undefined => {
  const hasCertification = certifications && certifications.length > 0;
  const hasRating = ratings && ratings.length > 0;
  const certificationTitle = hasCertification ? CERTIFICATIONS : '';
  const ratingTitle = hasRating ? RATINGS : '';

  let title: string;
  if (hasCertification && hasRating) {
    title = `${certificationTitle} & ${ratingTitle}`;
  } else if (hasCertification && !hasRating) {
    title = certificationTitle;
  } else if (!hasCertification && hasRating) {
    title = ratingTitle;
  } else {
    title = '';
  }

  const certificationItems =
    certifications?.map(certification => {
      const certificationName = certification['schema:name'] ?? '';
      const certificationLink = certification['schema:url'] ?? '';

      return {
        image: {
          src:
            certificationIcons?.[certificationName] ?? '/svg/certification.svg',
        },
        link: {
          text: certificationName,
          href: certificationLink,
        },
      };
    }) ?? [];

  const ratingItems =
    ratings?.map(rating => {
      const ratingName = rating['schema:name'] ?? '';
      const ratingLink = rating['schema:url'] ?? '';

      return {
        image: {
          src: ratingIcons?.[ratingName] ?? '/svg/rating.svg',
        },
        link: {
          text: ratingName,
          href: ratingLink,
        },
      };
    }) ?? [];

  const items: RoundLogoItemType[] = [...certificationItems, ...ratingItems];

  return items.length > 0 ? { title, items } : undefined;
};
