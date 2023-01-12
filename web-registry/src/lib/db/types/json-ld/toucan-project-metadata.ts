import { NameUrl, TypeValue, URL } from 'lib/rdf/types';

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
  'regen:projectStartDate'?: TypeValue;
  'regen:projectEndDate'?: TypeValue;
  'regen:projectType'?: string;
  'regen:projectActivity'?: NameUrl;
  'regen:offsetGenerationMethod'?: string;
}

interface ApprovedMethodology {
  'schema:identifier': string;
  'schema:name': string;
  'schema:url': URL;
  'schema:version': string;
}
