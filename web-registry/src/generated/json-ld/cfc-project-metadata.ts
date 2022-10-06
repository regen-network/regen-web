import { ProjectMetadataLD } from './project-metadata';

// type generated from https://github.com/regen-network/regen-registry-standards/blob/main/jsonld/projects/C02-project.jsonld

export interface CFCProjectMetadataLD
  extends Omit<
    ProjectMetadataLD,
    'regen:projectStartDate' | 'regen:projectEndDate'
  > {
  'regen:cfcProjectId'?: string;
  'regen:cfcProjectPage'?: string;
  'regen:projectDesignDocument'?: string;
  'regen:projectOperator'?: RegenProjectOperator;
  'regen:offsetProtocol'?: RegenOffsetProtocol;
  'regen:projectStartDate': string;
  'regen:projectEndDate': string;
}

interface RegenOffsetProtocol {
  'schema:name': string;
  'schema:url': string;
  'schema:version': string;
}

interface RegenProjectOperator {
  'schema:name': string;
  'schema:url': string;
}
