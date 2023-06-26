import { CompactedNameUrl } from 'lib/rdf/types';

import { Certification } from './certification';
import { ApprovedMethodologies } from './methodology';
import { BeZeroRating } from './rating';
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
  'regen:rating': BeZeroRating;
  'regen:certification': Certification;

  // optional in C03:
  'regen:projectStartDate'?: string;
  'regen:projectEndDate'?: string;
  'regen:projectType'?: string;
  'regen:projectActivity'?: CompactedNameUrl;
  'regen:offsetGenerationMethod'?: string;
}
