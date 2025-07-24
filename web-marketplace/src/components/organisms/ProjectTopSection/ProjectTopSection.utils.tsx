/* parseMethodologies */
import Image from 'next/image';

import SvgColorOverride from 'web-components/src/components/icons/utils/SvgColorOverride';
import {
  RoundLogoItemsListType,
  RoundLogoItemType,
} from 'web-components/src/components/molecules/RoundLogoItemsList/RoundLogoItemsList.types';

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
import { IS_REGEN } from 'lib/env';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { getSanityImgSrc } from 'lib/imgSrc';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

import { SanityNextImage } from 'components/atoms/SanityNextImage';

import certificationImg from '../../../../public/svg/certification.svg';
import ratingImg from '../../../../public/svg/rating.svg';
import {
  CERTIFICATIONS,
  RATINGS,
  SEE_ALL_METHODOLOGIES,
} from './ProjectTopSection.constants';

type GetSdgsImagesParams = {
  sdgs?: Maybe<Maybe<Sdg>[]>;
};

export const getSdgsImages = ({ sdgs }: GetSdgsImagesParams) => {
  const sdgsImages =
    sdgs?.map(sdg => {
      const src = getSanityImgSrc(sdg?.image);
      const image = IS_REGEN ? (
        <SanityNextImage
          alt={sdg?.title}
          image={sdg?.image?.image}
          fallback={
            sdg?.image?.imageHref
              ? { src: sdg?.image?.imageHref, width: 157, height: 157 }
              : null
          }
          className="w-50 h-50 sm:w-60 sm:h-60"
        />
      ) : src ? (
        <SvgColorOverride
          src={src}
          color="rgba(var(--ac-neutral-500) / 1)"
          filterIntensity={6}
          className="w-50 h-50 sm:w-60 sm:h-60"
        />
      ) : null;
      return { title: sdg?.title, image };
    }) ?? [];

  return sdgsImages;
};
type ParseMethodologiesParams = {
  methodologies?: ApprovedMethodologies;
  _: TranslatorType;
};

export const parseMethodologies = ({
  methodologies,
  _,
}: ParseMethodologiesParams) => {
  if (
    methodologies?.['schema:url'] &&
    methodologies?.['schema:itemListElement'].length > 1
  ) {
    return {
      'schema:name': _(SEE_ALL_METHODOLOGIES),
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
  _: TranslatorType,
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD,
  onChainProjectId?: string,
): ParseProjectMetadataReturn => {
  const projectName = projectMetadata?.['schema:name'];
  const projectSize = projectMetadata?.['regen:projectSize'];
  const area = projectSize?.['qudt:numericValue'];
  const unit = projectSize?.['qudt:unit'];
  const areaUnit = getAreaUnit(_, unit as qudtUnit, area);
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
        _,
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

type IconMapping = Record<string, ImageFieldsFragment | null | undefined>;

export const getIconsMapping = ({ data }: GetIconsMappingParams) => {
  return data?.reduce((acc, item) => {
    acc[item?.name?.toLowerCase() ?? ''] = item?.icon;
    return acc;
  }, {} as IconMapping);
};

/* getRatingAndCertificationsData */

type GetRatingAndCertificationsDataParams = {
  ratings?: Rating[];
  ratingIcons?: IconMapping;
  certifications?: Certification[];
  certificationIcons?: IconMapping;
  _: TranslatorType;
};

export const getRatingsAndCertificationsData = ({
  ratings,
  ratingIcons,
  certifications,
  certificationIcons,
  _,
}: GetRatingAndCertificationsDataParams):
  | RoundLogoItemsListType
  | undefined => {
  const hasCertification = certifications && certifications.length > 0;
  const hasRating = ratings && ratings.length > 0;
  const certificationTitle = hasCertification ? _(CERTIFICATIONS) : '';
  const ratingTitle = hasRating ? _(RATINGS) : '';

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
      const icon = certificationIcons?.[certificationName.toLowerCase()];

      return {
        image: icon ? (
          <SanityNextImage image={icon} alt={certificationName} />
        ) : (
          <Image src={certificationImg} alt={certificationName} unoptimized />
        ),
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
      const icon = ratingIcons?.[ratingName.toLowerCase()];

      return {
        image: icon ? (
          <SanityNextImage image={icon} alt={ratingName} />
        ) : (
          <Image src={ratingImg} alt={ratingName} unoptimized />
        ),
        link: {
          text: ratingName,
          href: ratingLink,
        },
      };
    }) ?? [];

  const items: RoundLogoItemType[] = [...certificationItems, ...ratingItems];

  return items.length > 0 ? { title, items } : undefined;
};
