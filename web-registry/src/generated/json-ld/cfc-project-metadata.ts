import { TypeValue } from 'web-components/lib/types/rdf';
import { UrlType } from 'web-components/lib/utils/schemaURL';

import { ProjectMetadataLD } from '.';

// type generated from compacted https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/projects/C02-project.jsonld

export interface CFCProjectMetadataLD extends ProjectMetadataLD {
  'regen:cfcProjectId': string;
  'regen:cfcProjectPage': TypeValue;
  'regen:offsetProtocol': OffsetProtocol;
  'regen:projectDesignDocument': TypeValue;
  'regen:projectOperator'?: ProjectOperator;
}

interface OffsetProtocol {
  'schema:name': string;
  'schema:url': UrlType;
  'schema:version': string;
}

interface ProjectOperator {
  'schema:name': string;
  'schema:url': UrlType;
}
