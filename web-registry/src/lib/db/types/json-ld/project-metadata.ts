import { TypeValue, UrlList, UrlType } from 'lib/rdf/types';

// TODO: remember that all exisiting metadata will have to be updated

/** Signed metadata AKA "Additional Info" */
export interface ProjectMetadataLD {
  '@context': Context;
  '@type': string; // regen:C01-Project

  'schema:name': string;
  'schema:location': any;
  'regen:projectType': string;
  'regen:projectActivity': ProjectActivity;
  'regen:offsetGenerationMethod': string;
  // TODO: not sure why regen:offsetGenerationMethod isn't compacting as expected so added this:
  'http://regen.network/offsetGenerationMethod'?: string;
  'regen:projectSize': ProjectSize;
  'regen:projectStartDate': TypeValue;
  'regen:projectEndDate': TypeValue;
}

/** This is unsigned metadata */
export interface ProjectPageMetadataLD {
  '@context': Context;
  '@type': string; // regen:C01-Project-Page

  // media
  'schema:image': UrlType;
  'schema:creditText': string;
  'regen:galleryPhotos': UrlList;
  'regen:previewPhoto': UrlType;
  'regen:videoURL': UrlType;

  // roles
  'regen:projectDeveloper': ProjectStakeholder;
  'regen:landSteward': ProjectStakeholder;
  'regen:landOwner': ProjectStakeholder;
  'regen:projectOriginator': ProjectStakeholder;

  // marketing
  'regen:landStory': string;
  'regen:landStewardStory': string;
  'regen:landStewardPhoto': UrlType;
  'regen:projectQuote': ProjectQuote;
  'regen:landStewardStoryTitle': string;
  'schema:description'?: string;

  // legacy? - may not exist in standards repo
  'regen:boundaries': TypeValue;
  'regen:creditClass': CreditClass;
  'regen:landManagementActions': LandManagementActions;
  'regen:glanceText': any;
}

export interface ProjectCreateMetadataLD
  extends ProjectMetadataLD,
    ProjectPageMetadataLD {}

interface Context {
  schema: string;
  regen: string;
  qudt: string;
  unit: string;
  xsd: string;
}

interface ProjectSize {
  'qudt:unit': TypeValue;
  'qudt:numericValue': TypeValue;
}

interface ProjectActivity {
  'schema:name': string;
  'schema:url': UrlType;
}

export interface ProjectStakeholder {
  '@type': string;
  'schema:name': string;
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

interface ProjectQuote {
  'schema:name': string;
  'regen:quote': string;
  'schema:jobTitle': string;
}

interface CreditClass {
  '@id': string;
  '@type': string;
}
