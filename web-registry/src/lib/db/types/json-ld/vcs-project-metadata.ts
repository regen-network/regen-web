import { UrlType } from 'lib/rdf/types';

import { ProjectMetadataLD } from './project-metadata';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/projects/C01-verified-carbon-standard-project.json

export interface VCSProjectMetadataLD extends ProjectMetadataLD {
  'regen:vcsProjectId'?: number;
  'regen:vcsProjectPage'?: UrlType;
  'regen:vcsMethodology'?: {
    'schema:name': string;
    'schema:url': UrlType;
  };
}
