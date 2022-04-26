import { URL, TypeValue } from '../../types/rdf';
import { ProjectMetadataLD } from './project-metadata';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/projects/C01-verified-carbon-standard-project.json

export interface VCSProjectMetadataLD extends ProjectMetadataLD {
  '@context': Context;
  '@type': string;
  'schema:description': TypeValue;
  'regen:vcsProjectId': TypeValue;
  'regen:vcsProjectPage': URL;
  'regen:vcsMethodology': TypeValue;
}

interface Context {
  schema: string;
  regen: string;
  qudt: string;
  unit: string;
  xsd: string;
}
