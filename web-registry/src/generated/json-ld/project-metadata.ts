import { TypeValue } from 'web-components/lib/types/rdf';
import { UrlList, UrlType } from 'web-components/lib/utils/schemaURL';

export interface ProjectMetadataLD {
  '@context': Context;
  '@type': string;
  'schema:name': string;
  'schema:image': UrlType;
  'schema:creditText': string;
  'schema:description'?: string;
  'schema:location': any;
  'regen:projectType': string;
  'regen:projectActivity': ProjectActivity;
  'regen:projectDeveloper': ProjectStakeholder;
  'regen:landSteward': ProjectStakeholder;
  'regen:landOwner': ProjectStakeholder;
  'regen:projectOriginator': ProjectStakeholder;
  'regen:offsetGenerationMethod': string;
  'regen:projectSize': ProjectSize;
  'regen:projectStartDate': TypeValue;
  'regen:projectEndDate': TypeValue;
  'regen:boundaries': TypeValue;
  'regen:creditClass': CreditClass;
  'regen:landManagementActions': LandManagementActions;
  'regen:galleryPhotos': UrlList;
  'regen:previewPhoto': UrlType;
  'regen:videoURL': UrlType;
  'regen:glanceText': TypeValue[];
  'regen:landStory': string;
  'regen:landStewardStory': string;
  'regen:landStewardPhoto': UrlType;
  'regen:projectQuote': ProjectQuote;
  'regen:landStewardStoryTitle': string;
}

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
