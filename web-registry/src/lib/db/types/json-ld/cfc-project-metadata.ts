import { AnchoredProjectMetadataBaseLD } from '.';
import { Certification } from './certification';

// type generated from compacted https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/projects/C02-project.jsonld

export interface CFCProjectMetadataLD extends AnchoredProjectMetadataBaseLD {
  'regen:cfcProjectId': string;
  'regen:cfcProjectPage': string;
  'regen:offsetProtocol': OffsetProtocol;
  'regen:projectDesignDocument': string;
  'regen:certification': Certification;
}

interface OffsetProtocol {
  'schema:name': string;
  'schema:url': string;
  'schema:version': string;
}
