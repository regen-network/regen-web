import { Party } from 'web-components/lib/components/user/UserInfo';

import {
  AnchoredProjectMetadataBaseLD,
  ProjectStakeholder,
} from 'lib/db/types/json-ld';

import { Maybe, PartyFieldsFragment } from '../generated/graphql';

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
