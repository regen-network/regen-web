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
  // TODO: not sure why regen:offsetGenerationMethod isn't compacting as expected so added this:
  'http://regen.network/offsetGenerationMethod'?: string;
  'regen:projectSize': ProjectSize;
  'regen:projectStartDate': TypeValue;
  'regen:projectEndDate': TypeValue;
  'regen:projectDeveloper': ProjectStakeholder;
  'regen:landSteward': ProjectStakeholder;
  'regen:landOwner': ProjectStakeholder;
  'regen:projectOriginator': ProjectStakeholder;
}

/** Un-anchored metadata from our DB. This is editable without a Ledger TX. */
export interface ProjectPageMetadataLD {
  '@context': Context;
  '@type': string; // regen:Project-Page
  'regen:creditClassId': string;

  'regen:previewPhoto'?: UrlType;
  'schema:image'?: UrlType; // exist?
  'schema:creditText'?: string;
  'regen:galleryPhotos'?: UrlList;
  'regen:videoURL'?: UrlType;
  'regen:glanceText'?: any;
  'regen:landStory'?: string;
  'regen:landStewardStory'?: string;
  'regen:landStewardStoryTitle'?: string;
  'regen:landStewardPhoto'?: UrlType;
  'regen:projectQuote'?: ProjectQuote;
  'schema:description'?: string;
  'regen:boundaries'?: TypeValue;
  'regen:creditClass'?: CreditClass;
  'regen:landManagementActions'?: LandManagementActions;

  // Optional reference IDs:
  'regen:vcsProjectId'?: number;
  'regen:cfcProjectId'?: string;
  'regen:toucanProjectTokenId'?: number; // TODO: we might not need this?
}

interface Context {
  schema: 'http://schema.org/';
  regen: 'http://regen.network/';
  qudt: 'http://qudt.org/schema/qudt/';
  unit: 'http://qudt.org/vocab/unit/';
  xsd: 'http://www.w3.org/2001/XMLSchema#';
}

interface ProjectSize {
  'qudt:unit': TypeValue;
  'qudt:numericValue': TypeValue;
}

export interface ProjectStakeholder {
  '@type': string;
  'schema:name': string;
  'schema:url'?: UrlType;
  'schema:description': string;
  'schema:email': string;
  'schema:logo'?: UrlType;
  'schema:image': UrlType;
  'schema:location': any;
  'schema:legalName': string;
  'regen:sharePermission': boolean;
  'regen:responsiblePerson': string;
  'regen:showOnProjectPage': boolean;
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
