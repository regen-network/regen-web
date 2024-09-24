import { useLocation } from 'react-router-dom';
import { msg } from '@lingui/macro';

import { Account } from 'web-components/src/components/user/UserInfo';

import {
  AnchoredProjectMetadataBaseLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

function getVisibleAccountName(
  account?: Account | undefined,
): string | undefined {
  return account?.name;
}

interface UseSeoParams {
  projectMetadata?: AnchoredProjectMetadataBaseLD;
  projectPageMetadata?: ProjectPageMetadataLD;
  landSteward?: Account;
  projectDeveloper?: Account;
  landOwner?: Account;
  creditClassName: string | undefined;
  _: TranslatorType;
}

export default function useSeo({
  projectMetadata,
  projectPageMetadata,
  landSteward,
  projectDeveloper,
  landOwner,
  creditClassName,
  _,
}: UseSeoParams) {
  // this function is used to format credit class metadata into SEO
  // optimization tags for the project pages. i believe the main use case is at
  // the very least to get links to a particular credit class page formatting
  // nicely in twitter/google.
  const location = useLocation();

  const accountName =
    getVisibleAccountName(landSteward) ||
    getVisibleAccountName(projectDeveloper) ||
    getVisibleAccountName(landOwner);

  const metadataLocation = projectMetadata?.['schema:location'];
  const projectAddress = metadataLocation?.['place_name'];

  const siteMetadata = {
    title: _(msg`Regen Marketplace`),
    description:
      creditClassName && accountName && projectAddress
        ? _(
            msg`Learn about ${creditClassName} credits sourced from ${accountName} in ${projectAddress}.`,
          )
        : '',
    author: _(msg`Regen Network`),
    siteUrl: `${window.location.origin}`,
  };

  return {
    location,
    siteMetadata,
    title: projectMetadata?.['schema:name'],
    imageUrl:
      projectPageMetadata?.['schema:image'] ||
      projectPageMetadata?.['regen:previewPhoto']?.['schema:url'],
  };
}
