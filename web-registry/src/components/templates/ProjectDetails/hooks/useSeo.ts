import { useLocation } from 'react-router-dom';

import { ProjectStakeholder } from 'lib/db/types/json-ld';

function getVisiblePartyName(party?: ProjectStakeholder): string | undefined {
  return party?.['regen:showOnProjectPage']
    ? party?.['schema:name']
    : undefined;
}

interface InputProps {
  metadata: any;
  creditClassName: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useSeo({ metadata, creditClassName }: InputProps) {
  // this function is used to format credit class metadata into SEO
  // optimization tags for the project pages. i believe the main use case is at
  // the very least to get links to a particular credit class page formatting
  // nicely in twitter/google.
  const location = useLocation();

  const partyName =
    getVisiblePartyName(metadata?.['regen:landSteward']) ||
    getVisiblePartyName(metadata?.['regen:projectDeveloper']) ||
    getVisiblePartyName(metadata?.['regen:landOwner']) ||
    getVisiblePartyName(metadata?.['regen:projectOriginator']);

  const metadataLocation = metadata?.['schema:location'];
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
    title: metadata?.['schema:name'],
    imageUrl: metadata?.['schema:image']?.['@value'],
  };
}
