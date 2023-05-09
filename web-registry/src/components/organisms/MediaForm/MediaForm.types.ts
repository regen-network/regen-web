import { ProjectStoryMedia } from 'lib/db/types/json-ld';

import { MediaErrorsSimple, MediaValuesSimple } from './MediaFormPhotos';

export interface MediaBaseValues {
  'regen:previewPhoto'?: string;
  'regen:galleryPhotos'?: Array<string>;
  'regen:storyMedia'?: ProjectStoryMedia;
}

export interface MediaBaseErrors {
  'regen:previewPhoto'?: string;
  'regen:storyMedia'?: string;
}

export type MediaFormValues = MediaValuesSimple;
export type MediaErrors = MediaErrorsSimple;

export type MediaPhotoType = {
  'schema:url': string;
  'schema:creditText'?: string;
  'schema:caption'?: string;
};
