import { User } from 'web-components/lib/components/user/UserInfo';
import { truncate } from 'web-components/lib/utils/truncate';

import {
  Maybe,
  PartyFieldsFragment,
  ProjectFieldsFragment,
} from 'generated/graphql';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
  LegacyProjectMetadataLD,
  ProjectPageMetadataLD,
  ProjectQuote,
} from 'lib/db/types/json-ld';
import { CFCCreditClassMetadataLD } from 'lib/db/types/json-ld/cfc-credit-class-metadata';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

import { SEE_ALL_METHODOLOGIES } from './ProjectTopSection.constants';

export const getDisplayAdmin = (
  address?: string,
  party?: Maybe<PartyFieldsFragment>,
  defaultAvatar?: string,
): User | undefined => {
  if (!address) return;
  if (!!party) {
    const name = party.name;
    const type = party.type;
    return {
      name: name ? name : truncate(address),
      type: type ? type : 'USER',
      image: party.image ? party.image : defaultAvatar,
      description: party.description,
      link: `/ecocredits/accounts/${address}/portfolio`,
    };
  }
  return {
    name: truncate(address),
    type: 'USER',
    image: defaultAvatar,
    link: `/ecocredits/accounts/${address}/portfolio`,
  };
};

/* parseMethodologies */

type ParseMethodologiesParams = {
  methodologies?: AnchoredProjectMetadataLD['regen:approvedMethodologies'];
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

  return methodologies?.['schema:itemListElement'][0];
};

/* parseProjectMetadata */

type ParseProjectMetadataReturn = {
  projectName?: string;
  area?: number;
  areaUnit?: string;
  placeName?: string;
  projectMethodology?: {
    'schema:name': string;
    'schema:url'?: string;
  };
};

export const parseProjectMetadata = (
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD,
): ParseProjectMetadataReturn => {
  const projectName = projectMetadata?.['schema:name'];
  const projectSize = projectMetadata?.['regen:projectSize'];
  const area = projectSize?.['qudt:numericValue'];
  const unit = projectSize?.['qudt:unit'];
  const areaUnit = getAreaUnit(unit as qudtUnit);
  const placeName = projectMetadata?.['schema:location']?.['place_name'];
  let projectMethodology;
  if (isAnchoredProjectMetadata(projectMetadata)) {
    projectMethodology =
      projectMetadata?.['regen:vcsMethodology'] ??
      projectMetadata?.['regen:offsetProtocol'] ??
      parseMethodologies({
        methodologies: projectMetadata['regen:approvedMethodologies'],
      });
  }
  // projectMetadata?.['schema:location']?.['geojson:place_name'];

  return { projectName, area, areaUnit, placeName, projectMethodology };
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
  const sdgIris = creditClassVersion?.metadata?.['regen:SDGs']?.map(
    (sdg: { '@id': string }) => sdg['@id'],
  );
  const offsetGenerationMethod =
    creditClassVersion?.metadata?.['regen:offsetGenerationMethod'];

  return {
    creditClass,
    creditClassVersion,
    sdgIris,
    offsetGenerationMethod,
  };
};

export const isAnchoredProjectMetadata = (
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD,
  onChainProjectId?: string,
): projectMetadata is AnchoredProjectMetadataLD => {
  return !!onChainProjectId;
};

const isCFCCreditClassMetadata = (
  creditClassMetadata?: CreditClassMetadataLD | CFCCreditClassMetadataLD,
): creditClassMetadata is CFCCreditClassMetadataLD => {
  return (
    !!creditClassMetadata &&
    typeof creditClassMetadata?.['regen:offsetGenerationMethod']?.[0] !==
      'string'
  );
};

export const getOffsetGenerationMethod = (metadata?: CreditClassMetadataLD) => {
  if (isCFCCreditClassMetadata(metadata)) {
    return metadata?.['regen:offsetGenerationMethod']?.[0]['@value'];
  }

  return metadata?.['regen:offsetGenerationMethod']?.[0];
};
