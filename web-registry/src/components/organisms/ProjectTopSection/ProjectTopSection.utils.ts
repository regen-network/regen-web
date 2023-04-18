import { User } from 'web-components/lib/components/user/UserInfo';
import { truncate } from 'web-components/lib/utils/truncate';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
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

const addressesMap = [
  'regen123a7e9gvgm53zvswc6daq7c85xtzt8263lgasm', // Mainnet - Credit classes
  'regen1v2ncquer9r2ytlkxh2djmmsq3e8we6rjc9snfn', // Mainnet - Projects
  'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46', // Redwood - Shared dev account
];

export const getDisplayAdmin = (address?: string): User | undefined => {
  if (!address) return;
  if (addressesMap.includes(address)) {
    return {
      name: 'Regen Network Development, Inc',
      type: 'ORGANIZATION',
      image: 'https://regen-registry.s3.amazonaws.com/regen-logo-green.svg',
      description:
        'Regen Network realigns the agricultural economy with ecological health by creating the global marketplace for planetary stewardship.',
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
