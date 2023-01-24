import { User } from 'web-components/lib/components/user/UserInfo';
import { truncate } from 'web-components/lib/utils/truncate';

import {
  CreditClass,
  CreditClassVersion,
  Maybe,
  Project,
} from 'generated/graphql';
import {
  AnchoredProjectMetadataIntersectionLD,
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

type AnchoredMetadata = {
  projectName?: string;
  area?: string;
  areaUnit?: string;
  placeName?: string;
};

export const getAnchoredMetadata = (
  anchoredMetadata?: Partial<AnchoredProjectMetadataIntersectionLD>,
): AnchoredMetadata => {
  const projectName = anchoredMetadata?.['schema:name'];
  const projectSize = anchoredMetadata?.['regen:projectSize'];
  const area = projectSize?.['qudt:numericValue']?.['@value'];
  const unit = projectSize?.['qudt:unit']?.['@value'];
  const areaUnit = getAreaUnit(unit as qudtUnit);
  const placeName =
    anchoredMetadata?.['schema:location']?.['place_name'] ??
    anchoredMetadata?.['schema:location']?.['geojson:place_name'];

  return { projectName, area, areaUnit, placeName };
};

type UnanchoredMetadata = {
  videoURL?: string | null;
  glanceText?: string[];
  primaryDescription?: string;
  quote?: ProjectQuote;
  landStewardPhoto?: string | null;
  landStewardStoryTitle?: string | null;
  landStewardStory?: string | null;
};

export const getUnanchoredMetadata = (
  projectPageMetadata?: Partial<ProjectPageMetadataLD>,
): UnanchoredMetadata => {
  const videoURL = projectPageMetadata?.['regen:videoURL']?.['@value'];
  const glanceText = projectPageMetadata?.['regen:glanceText']?.['@list'];
  const primaryDescription =
    projectPageMetadata?.['regen:landStory'] ||
    projectPageMetadata?.['schema:description'];
  const quote = projectPageMetadata?.['regen:projectQuote'];
  const landStewardPhoto =
    projectPageMetadata?.['regen:landStewardPhoto']?.['@value'];
  const landStewardStoryTitle =
    projectPageMetadata?.['regen:landStewardStoryTitle'];
  const landStewardStory = projectPageMetadata?.['regen:landStewardStory'];

  return {
    videoURL,
    glanceText,
    primaryDescription,
    quote,
    landStewardPhoto,
    landStewardStoryTitle,
    landStewardStory,
  };
};

type ProjectDetails = {
  creditClass?: Maybe<CreditClass>;
  creditClassVersion?: Maybe<CreditClassVersion>;
  sdgIris?: any[];
  offsetGenerationMethod?: string;
};

export const getProjectDetails = (project?: Maybe<Project>): ProjectDetails => {
  const creditClass = project?.creditClassByCreditClassId;
  const creditClassVersion = creditClass?.creditClassVersionsById?.nodes?.[0];
  const sdgIris = creditClassVersion?.metadata?.['http://regen.network/SDGs']?.[
    '@list'
  ]?.map((sdg: { '@id': string }) => sdg['@id']);
  const offsetGenerationMethod =
    creditClassVersion?.metadata?.[
      'http://regen.network/offsetGenerationMethod'
    ];

  return {
    creditClass,
    creditClassVersion,
    sdgIris,
    offsetGenerationMethod,
  };
};
