import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import { CompactedNameUrl } from 'lib/rdf/types';

import { Rating } from './rating';

/** Anchored metadata AKA "Additional Info" - Editable only with a signed Ledger TX. */
export interface AnchoredProjectMetadataBaseLD {
  '@context': Context;
  '@type': string; // ex: regen:C01-Project
  'schema:name': string;
  'schema:location': GeocodeFeature;
  'regen:projectType': string;
  'regen:projectActivity': CompactedNameUrl;
  'regen:offsetGenerationMethod'?: string[];
  'regen:projectSize': ProjectSize;
  'regen:projectStartDate'?: string;
  'regen:projectEndDate'?: string;
  'regen:projectDeveloper'?: ProjectStakeholder;
  'regen:projectVerifier'?: ProjectStakeholder;
  'regen:landSteward'?: ProjectStakeholder;
  'regen:landOwner'?: ProjectStakeholder;
  'regen:projectOriginator'?: ProjectStakeholder;
  'regen:ratings'?: Rating[];
}

/** Un-anchored metadata from our DB. This is editable without a Ledger TX. */
export interface ProjectPageMetadataLD {
  '@context': Context;
  '@type': string; // regen:Project-Page
  '@id': string;
  'regen:creditClassId': string;
  'regen:previewPhoto'?: {
    'schema:url': string;
    'schema:creditText'?: string;
  };
  'regen:galleryPhotos'?: {
    'schema:url': string;
    'schema:caption'?: string;
    'schema:creditText'?: string;
  }[];
  'schema:creditText'?: string;
  'schema:description'?: string;

  // Legacy project fields
  'schema:image'?: string;
  'regen:glanceText'?: string[];
  'regen:landStory'?: string;
  'regen:story'?: string;
  'regen:storyTitle'?: string;
  'regen:storyMedia'?: ProjectStoryMedia;
  'regen:projectQuote'?: ProjectQuote;
  'regen:boundaries'?: string;
  'regen:landManagementActions'?: NameImageDescription[];
}

export type ProjectStoryMediaType =
  | 'schema:ImageObject'
  | 'schema:VideoObject'
  | '';

export type ProjectStoryMedia = {
  '@type': ProjectStoryMediaType;
  'schema:url': string;
  'schema:creditText'?: string;
};

interface Context {
  schema: string;
  regen: string;
  qudt?: string;
  unit?: string;
  xsd?: string;
}

interface ProjectSize {
  'qudt:unit': string;
  'qudt:numericValue': number;
}

export const REGEN_INDIVIDUAL = 'regen:Individual';
export const REGEN_ORGANIZATION = 'regen:Organization';

export interface ProjectStakeholder {
  '@type'?: typeof REGEN_INDIVIDUAL | typeof REGEN_ORGANIZATION;
  'schema:name': string;
  'schema:description'?: string;
  'schema:image'?: string;
  'regen:address'?: string;
  'schema:url'?: string;
  'schema:location'?: GeocodeFeature;
}

export interface NameImageDescription {
  'schema:name': string;
  'schema:image': string;
  'schema:description': string;
}

export interface ProjectQuote {
  'schema:name': string;
  'regen:quote': string;
  'schema:jobTitle': string;
}
