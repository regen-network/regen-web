<<<<<<< HEAD
import { URL } from 'web-components/lib/types/rdf';
=======
import { TypeValue, URL } from 'web-components/lib/types/rdf';

>>>>>>> 92528156 (David/eslint simple import sort (#1075))
import { ProjectMetadataLD } from './project-metadata';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/projects/C01-verified-carbon-standard-project.json

export interface VCSProjectMetadataLD extends ProjectMetadataLD {
  '@context': Context;
  '@type': string;
  'schema:description': string;
  'regen:vcsProjectId': number;
  'regen:vcsProjectPage': URL;
  'regen:vcsMethodology': {
    'schema:name': string;
    'schema:url': URL;
  };
}

interface Context {
  schema: string;
  regen: string;
  qudt: string;
  unit: string;
  xsd: string;
}
