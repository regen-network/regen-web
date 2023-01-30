import { NameUrl, TypeValue, UrlList, UrlType } from 'lib/rdf/types';

/** Anchored metadata AKA "Additional Info" - Editable only with a signed Ledger TX. */
export interface ProjectMetadataLD {
  '@context': Context;
  '@type': string; // ex: regen:C01-Project
  'schema:name': string;
  'schema:location': any;
  'regen:projectType': string;
  'regen:projectActivity': NameUrl;
  'regen:offsetGenerationMethod': string;
  // regen:offsetGenerationMethod doesn't get compacted for project metadata because
  // in COMPACTED_CONTEXT, we specify: 'regen:offsetGenerationMethod': { '@container': '@list' }
  // while in project metadata, it's a string, not a list
  // this context is used in credit classes metadata, we should probably update the credit classes metadata
  // to use offsetGenerationMethods (plural!) since it can be a list
  'http://regen.network/offsetGenerationMethod'?: string;
  'regen:projectSize': ProjectSize;
  'regen:projectStartDate': TypeValue;
  'regen:projectEndDate': TypeValue;
  'regen:projectDeveloper'?: ProjectStakeholder;
  'regen:landSteward'?: ProjectStakeholder;
  'regen:landOwner'?: ProjectStakeholder;
  'regen:projectOriginator'?: ProjectStakeholder;
}

/** Un-anchored metadata from our DB. This is editable without a Ledger TX. */
export interface ProjectPageMetadataLD {
  '@context': Context;
  '@type': string; // regen:Project-Page
  '@id': string;
  'regen:creditClassId': string;
  'regen:previewPhoto'?: UrlType;
  'regen:galleryPhotos'?: UrlList;
  'regen:videoURL'?: UrlType;
  'schema:creditText'?: string;
  'schema:description'?: string;

  // Legacy project fields
  'schema:image'?: UrlType;
  'regen:glanceText'?: any;
  'regen:landStory'?: string;
  'regen:landStewardStory'?: string;
  'regen:landStewardStoryTitle'?: string;
  'regen:landStewardPhoto'?: UrlType;
  'regen:projectQuote'?: ProjectQuote;
  'regen:boundaries'?: TypeValue;
  'regen:landManagementActions'?: LandManagementActions;
}

interface Context {
  schema: 'http://schema.org/';
  regen: 'http://regen.network/';
  qudt?: 'http://qudt.org/schema/qudt/';
  unit?: 'http://qudt.org/vocab/unit/';
  xsd?: 'http://www.w3.org/2001/XMLSchema#';
}

interface ProjectSize {
  'qudt:unit': TypeValue;
  'qudt:numericValue': TypeValue;
}

export interface ProjectStakeholder {
  '@type': string;
  'schema:name': string;
  'schema:description'?: string;
  'schema:image'?: UrlType;
  'regen:adress'?: string;
  'regen:showOnProjectPage': boolean;

  // Legacy project stakeholder fields
  'schema:url'?: UrlType;
  'schema:email'?: string;
  'schema:logo'?: UrlType;
  'schema:location'?: any;
  'schema:legalName'?: string;
  'regen:sharePermission'?: boolean;
  'regen:responsiblePerson'?: string;
}

interface NameImageDescription {
  'schema:name': string;
  'schema:image': UrlType;
  'schema:description': string;
}

interface LandManagementActions {
  '@list': NameImageDescription[];
}

export interface ProjectQuote {
  'schema:name': string;
  'regen:quote': string;
  'schema:jobTitle': string;
}

interface CreditClass {
  '@id': string;
  '@type': string;
}
