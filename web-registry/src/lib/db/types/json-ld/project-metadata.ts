import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import { ProfileType } from 'web-components/lib/components/modal/ProfileModal';

import { CompactedNameUrl } from 'lib/rdf/types';

/** Anchored metadata AKA "Additional Info" - Editable only with a signed Ledger TX. */
export interface AnchoredProjectMetadataBaseLD {
  '@context': Context;
  '@type': string; // ex: regen:C01-Project
  'schema:name': string;
  'schema:location': GeocodeFeature;
  'regen:projectType': string;
  'regen:projectActivity': CompactedNameUrl;
  'regen:offsetGenerationMethod': string;
  // regen:offsetGenerationMethod doesn't get compacted for project metadata because
  // in COMPACTED_CONTEXT, we specify: 'regen:offsetGenerationMethod': { '@container': '@list' }
  // while in project metadata, it's a string, not a list
  // this context is used in credit classes metadata, we should probably update the credit classes metadata
  // to use offsetGenerationMethods (plural!) since it can be a list
  'http://regen.network/offsetGenerationMethod'?: string;
  'regen:projectSize': ProjectSize;
  'regen:projectStartDate'?: string;
  'regen:projectEndDate'?: string;
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
  'regen:previewPhoto'?: string;
  'regen:galleryPhotos'?: string[];
  'regen:videoURL'?: string;
  'schema:creditText'?: string;
  'schema:description'?: string;

  // Legacy project fields
  'schema:image'?: string;
  'regen:glanceText'?: string[];
  'regen:landStory'?: string;
  'regen:landStewardStory'?: string;
  'regen:landStewardStoryTitle'?: string;
  'regen:landStewardPhoto'?: string;
  'regen:projectQuote'?: ProjectQuote;
  'regen:boundaries'?: string;
  'regen:landManagementActions'?: NameImageDescription[];
}

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

export interface ProjectStakeholder {
  '@type': ProfileType;
  'schema:name': string;
  'schema:description'?: string;
  'schema:image'?: string;
  'regen:adress'?: string;
  'regen:showOnProjectPage': boolean;
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
