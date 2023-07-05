import { CompactedNameOptionalUrl } from 'lib/rdf/types';

import { ApprovedMethodologies } from './methodology';
import { VCSProjectMetadataLD } from './vcs-project-metadata';

export interface ToucanProjectMetadataLD
  extends Omit<
    VCSProjectMetadataLD,
    | 'regen:projectStartDate'
    | 'regen:projectEndDate'
    | 'regen:projectType'
    | 'regen:projectActivity'
    | 'regen:offsetGenerationMethod'
  > {
  'regen:approvedMethodologies': ApprovedMethodologies;
  'regen:toucanProjectTokenId': number;
  'regen:toucanURI': string;

  // optional in C03:
  'regen:projectStartDate'?: string;
  'regen:projectEndDate'?: string;
  'regen:projectType'?: string;
  'regen:projectActivity'?: CompactedNameOptionalUrl;
  'regen:offsetGenerationMethod'?: string;
}
