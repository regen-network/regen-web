import { useLocation } from 'react-router-dom';

import { Party } from 'web-components/lib/components/modal/LedgerModal';

import {
  AnchoredProjectMetadataBaseLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

function getVisiblePartyName(party?: Party | undefined): string | undefined {
  return party?.name;
}

interface UseSeoParams {
  projectMetadata?: AnchoredProjectMetadataBaseLD;
  projectPageMetadata?: ProjectPageMetadataLD;
  landSteward?: Party;
  projectDeveloper?: Party;
  landOwner?: Party;
  creditClassName: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useSeo({
  projectMetadata,
  projectPageMetadata,
  landSteward,
  projectDeveloper,
  landOwner,
  creditClassName,
}: UseSeoParams) {
  // this function is used to format credit class metadata into SEO
  // optimization tags for the project pages. i believe the main use case is at
  // the very least to get links to a particular credit class page formatting
  // nicely in twitter/google.
  const location = useLocation();

  const partyName =
    getVisiblePartyName(landSteward) ||
    getVisiblePartyName(projectDeveloper) ||
    getVisiblePartyName(landOwner);

  const metadataLocation = projectMetadata?.['schema:location'];
  const projectAddress = metadataLocation?.['place_name'];

  const siteMetadata = {
    title: `Regen Marketplace`,
    description:
      creditClassName && partyName && projectAddress
        ? `Learn about ${creditClassName} credits sourced from ${partyName} in ${projectAddress}.`
        : '',
    author: `Regen Network`,
    siteUrl: `${window.location.origin}`,
  };

  return {
    location,
    siteMetadata,
    title: projectMetadata?.['schema:name'],
    imageUrl:
      projectPageMetadata?.['schema:image'] ||
      projectPageMetadata?.['regen:previewPhoto'],
  };
}
