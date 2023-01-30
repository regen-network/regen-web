import StaticMap from 'web-components/lib/components/map/StaticMap';
import { Asset } from 'web-components/lib/components/sliders/ProjectMedia';

import { UrlType } from 'lib/rdf/types';

import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  MAPBOX_TOKEN,
} from '../ProjectDetails.config';

type InputProps = {
  metadata: any;
  geojson: any;
};

type Params = {
  assets: any;
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
  imageCredits?: string;
};

export default function useMedia({ metadata, geojson }: InputProps): Params {
  let assets;

  const galleryPhotos = metadata?.['regen:galleryPhotos']?.['@list']?.filter(
    (photo: UrlType) => !!photo?.['@value'],
  );
  const previewPhoto = metadata?.['regen:previewPhoto']?.['@value'];
  const noGallery = !galleryPhotos || galleryPhotos?.length === 0;
  const noGalleryAssets: Asset[] = [];

  if (previewPhoto) {
    noGalleryAssets.push({ src: previewPhoto, type: 'image' });
  }

  assets = noGallery
    ? noGalleryAssets
    : galleryPhotos.map((photo: { '@value': string }) => ({
        src: photo['@value'],
        type: 'image',
      }));

  if (geojson && assets.length < 2) {
    assets.push(<StaticMap geojson={geojson} mapboxToken={MAPBOX_TOKEN} />);
  }

  return {
    assets: assets ?? [],
    imageStorageBaseUrl: IMAGE_STORAGE_BASE_URL,
    apiServerUrl: API_URI,
    imageCredits: metadata?.['schema:creditText'],
  };
}
