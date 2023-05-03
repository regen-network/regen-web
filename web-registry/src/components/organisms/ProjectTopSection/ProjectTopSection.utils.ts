import { User } from 'web-components/lib/components/user/UserInfo';
import { truncate } from 'web-components/lib/utils/truncate';

import {
  Maybe,
  PartyByAddrQuery,
  ProjectFieldsFragment,
} from 'generated/graphql';
import {
  AnchoredProjectMetadataBaseLD,
  AnchoredProjectMetadataLD,
  LegacyProjectMetadataLD,
  ProjectPageMetadataLD,
  ProjectQuote,
} from 'lib/db/types/json-ld';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

// TODO
// This is a temporary hack to show Regen as a Project Admin when applicable

export const getDisplayAdmin = (
  address?: string,
  party?: PartyByAddrQuery | null,
): User | undefined => {
  if (!address) return;
  if (!!party) {
    const name = party.walletByAddr?.partyByWalletId?.name;
    const type = party.walletByAddr?.partyByWalletId?.type;
    return {
      name: name ? name : truncate(address),
      type: type ? type : 'ORGANIZATION',
      image: party.walletByAddr?.partyByWalletId?.image,
      description: party.walletByAddr?.partyByWalletId?.description,
      link: `/ecocredits/accounts/${address}`,
    };
  }
  return {
    name: truncate(address),
    type: 'ORGANIZATION',
    link: `/ecocredits/accounts/${address}`,
  };
};

type ParseProjectMetadataReturn = {
  projectName?: string;
  area?: number;
  areaUnit?: string;
  placeName?: string;
};

export const parseProjectMetadata = (
  projectMetadata?: Partial<AnchoredProjectMetadataBaseLD>,
): ParseProjectMetadataReturn => {
  const projectName = projectMetadata?.['schema:name'];
  const projectSize = projectMetadata?.['regen:projectSize'];
  const area = projectSize?.['qudt:numericValue'];
  const unit = projectSize?.['qudt:unit'];
  const areaUnit = getAreaUnit(unit as qudtUnit);
  const placeName = projectMetadata?.['schema:location']?.['place_name'];
  // projectMetadata?.['schema:location']?.['geojson:place_name'];

  return { projectName, area, areaUnit, placeName };
};

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
