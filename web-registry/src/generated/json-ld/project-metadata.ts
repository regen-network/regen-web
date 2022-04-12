import { URL, TypeValue } from '../../types/rdf';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

export interface ProjectMetadataLD {
  '@context': Context;
  '@type': string;
  'schema:name': string;
  'schema:image': URL;
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
  'schema:location': GeocodeFeature;
  'regen:boundaries': TypeValue;
  'regen:creditClass': CreditClass;
  'regen:landManagementActions': LandManagementActions;
  'regen:galleryPhotos': URLList;
  'regen:previewPhoto': URL;
  'regen:videoURL': URL;
  'schema:creditText': string;
  'regen:glanceText': TypeValue[];
  'regen:landStory': string;
  'regen:landStewardStory': string;
  'regen:landStewardPhoto': URL;
  'regen:projectQuote': ProjectQuote;
  'regen:landStewardStoryTitle': string;
}

interface ProjectSize {
  'qudt:unit': TypeValue;
  'qudt:numericValue': TypeValue;
}

interface ProjectActivity {
  'schema:name': string;
  'schema:url': URL;
}

export interface ProjectStakeholder {
  '@type': string;
  'schema:name': string;
  'schema:description': string;
  'schema:email': string;
  'schema:logo'?: URL;
  'schema:image': URL;
  'schema:location': GeocodeFeature;
  'schema:legalName': string;
  'regen:sharePermission': boolean;
  'regen:responsiblePerson': string;
  'regen:showOnProjectPage': boolean;
}

interface NameImageDescription {
  'schema:name': string;
  'schema:image': URL;
  'schema:description': string;
}

interface LandManagementActions {
  '@list': NameImageDescription[];
}

interface URLList {
  '@list': URL[];
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

interface Context {
  schema: string;
  regen: string;
  qudt: string;
  unit: string;
  xsd: string;
}
