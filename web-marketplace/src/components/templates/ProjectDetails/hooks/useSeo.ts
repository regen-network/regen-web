import { useLocation } from 'react-router-dom';

import { Account } from 'web-components/src/components/user/UserInfo';

import {
  AnchoredProjectMetadataBaseLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';
import { getProjectDisplayName } from '../ProjectDetails.utils';

function getVisibleAccountName(
  account?: Account | undefined,
): string | undefined {
  return account?.name;
}

interface UseSeoParams {
  projectMetadata?: AnchoredProjectMetadataBaseLD;
  projectPageMetadata?: ProjectPageMetadataLD;
  onChainProjectId?: string;
}

export default function useSeo({
  projectMetadata,
  projectPageMetadata,
  onChainProjectId,
}: UseSeoParams) {
  const location = useLocation();

  const title = getProjectDisplayName(
    projectMetadata?.['schema:name'],
    onChainProjectId,
  );
  const siteMetadata = {
    title: `Regen Marketplace`,
    description: projectPageMetadata?.['schema:description'] ?? '',
    author: `Regen Network`,
    siteUrl: `${window.location.origin}`,
  };

  return {
    location,
    siteMetadata,
    title,
    imageUrl: projectPageMetadata?.['regen:previewPhoto']?.['schema:url'],
  };
}
