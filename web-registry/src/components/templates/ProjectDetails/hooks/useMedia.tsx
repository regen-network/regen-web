import { useEffect, useState } from 'react';

import StaticMap from 'web-components/lib/components/map/StaticMap';
import { Asset } from 'web-components/lib/components/sliders/ProjectMedia';
import { UrlType } from 'web-components/lib/utils/schemaURL';

const IMAGE_STORAGE_BASE_URL = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
const API_URI = process.env.REACT_APP_API_URI;

interface InputProps {
  metadata: any;
  geojson: any;
}

interface ReturnType {
  assets: any;
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
  imageCredits?: string;
}

export default function useMedia({
  metadata,
  geojson,
}: InputProps): ReturnType {
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const galleryPhotos = metadata?.['regen:galleryPhotos']?.['@list']?.filter(
      (photo: UrlType) => !!photo?.['@value'],
    );
    const previewPhoto = metadata?.['regen:previewPhoto']?.['@value'];
    const noGallery = !galleryPhotos || galleryPhotos?.length === 0;
    const noGalleryAssets: Asset[] = [];

    if (previewPhoto) {
      noGalleryAssets.push({ src: previewPhoto, type: 'image' });
    }
    if (geojson) {
      noGalleryAssets.push(
        <StaticMap
          geojson={geojson}
          mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />,
      );
    }

    const _assets = noGallery
      ? noGalleryAssets
      : galleryPhotos.map((photo: { '@value': string }) => ({
          src: photo['@value'],
          type: 'image',
        }));

    setAssets(_assets);
  }, [geojson, metadata]);

  return {
    assets,
    imageStorageBaseUrl: IMAGE_STORAGE_BASE_URL,
    apiServerUrl: API_URI,
    imageCredits: metadata?.['schema:creditText'],
  };
}
