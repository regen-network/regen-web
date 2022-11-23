import { User } from 'web-components/lib/components/user/UserInfo';
import { truncate } from 'web-components/lib/utils/truncate';

import { Maybe, PartyFieldsFragment } from 'generated/graphql';
import { ProjectMetadataIntersectionLD } from 'generated/json-ld';
import { CFCProjectMetadataLD } from 'generated/json-ld/cfc-project-metadata';
import { getDisplayParty } from 'lib/transform';

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

export const getDisplayDeveloper = (
  metadata?: Partial<ProjectMetadataIntersectionLD>,
  party?: Maybe<PartyFieldsFragment>,
): User | undefined => {
  if (!metadata) return;
  if (metadata?.['regen:projectDeveloper']) {
    return getDisplayParty('regen:projectDeveloper', metadata, party);
  }
  // Possibly temporary: CFC case
  const projectOperator = (metadata as Partial<CFCProjectMetadataLD>)?.[
    'regen:projectOperator'
  ];
  if (projectOperator) {
    return {
      name: projectOperator?.['schema:name'],
      type: 'ORGANIZATION',
      link: projectOperator?.['schema:url']?.['@value'] || '',
    };
  }

  return;
};
