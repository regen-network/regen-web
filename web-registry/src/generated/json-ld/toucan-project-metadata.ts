import { URL } from 'web-components/lib/types/rdf';

import { VCSProjectMetadataLD } from './vcs-project-metadata';

export interface ToucanProjectMetadataLD extends VCSProjectMetadataLD {
  'regen:approvedMethodologies': ApprovedMethodology[];
  'regen:toucanProjectTokenId': number;
  'regen:toucanURI': string;
}

interface ApprovedMethodology {
  'schema:identifier': string;
  'schema:name': string;
  'schema:url': URL;
  'schema:version': string;
}
