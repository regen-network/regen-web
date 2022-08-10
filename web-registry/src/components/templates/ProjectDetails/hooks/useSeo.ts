import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ProjectStakeholder } from '../../../../generated/json-ld';
import { setPageView } from '../../../../lib/ga';

function getVisiblePartyName(party?: ProjectStakeholder): string | undefined {
  return party?.['regen:showOnProjectPage']
    ? party?.['schema:name']
    : undefined;
}

interface InputProps {
  metadata: any;
  creditClassName: string | undefined;
  handleReset?: () => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useSeo({
  metadata,
  creditClassName,
  handleReset,
}: InputProps) {
  const location = useLocation();

  const partyName =
    getVisiblePartyName(metadata?.['regen:landSteward']) ||
    getVisiblePartyName(metadata?.['regen:projectDeveloper']) ||
    getVisiblePartyName(metadata?.['regen:landOwner']) ||
    getVisiblePartyName(metadata?.['regen:projectOriginator']);

  const metadataLocation = metadata?.['schema:location'];
  const projectAddress = metadataLocation?.['place_name'];

  useEffect(() => {
    setPageView(location);
    handleReset && handleReset(); // reset when location changes
  }, [location, handleReset]);

  const siteMetadata = {
    title: `Regen Network Registry`,
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
