import { AnchoredProjectMetadataBaseLD } from './project-metadata';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/projects/C01-verified-carbon-standard-project.json

export interface VCSProjectMetadataLD extends AnchoredProjectMetadataBaseLD {
  'regen:vcsProjectId': number;
  'regen:vcsProjectPage': string;
  'regen:vcsMethodology': {
    'schema:name': string;
    'schema:url': string;
  };
}
