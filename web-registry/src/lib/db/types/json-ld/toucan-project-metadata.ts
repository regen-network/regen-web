import { CompactedNameUrl } from 'lib/rdf/types';

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
  'regen:approvedMethodologies': ApprovedMethodology[];
  'regen:toucanProjectTokenId': number;
  'regen:toucanURI': string;

  // optional in C03:
  'regen:projectStartDate'?: string;
  'regen:projectEndDate'?: string;
  'regen:projectType'?: string;
  'regen:projectActivity'?: CompactedNameUrl;
  'regen:offsetGenerationMethod'?: string;
}

interface ApprovedMethodology {
  'schema:identifier': string;
  'schema:name': string;
  'schema:url': string;
  'schema:version': string;
}
