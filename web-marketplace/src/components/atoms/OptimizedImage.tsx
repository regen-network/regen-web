import { Image, ImageProps } from 'web-components/src/components/image';

const imageStorageBaseUrl = import.meta.env.VITE_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = import.meta.env.VITE_API_URI;

/**
 * A wrapper around the `Image` component that automatically injects
 * the `apiServerUrl` and `imageStorageBaseUrl` props from environment variables.
 */
function OptimizedImage(props: ImageProps): JSX.Element {
  return (
    <Image
      apiServerUrl={apiServerUrl}
      imageStorageBaseUrl={imageStorageBaseUrl}
      {...props}
    />
  );
}

export { OptimizedImage };
