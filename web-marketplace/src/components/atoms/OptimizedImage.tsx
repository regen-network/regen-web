import { Image, ImageProps } from 'web-components/src/components/image';

const imageStorageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = process.env.NEXT_PUBLIC_API_URI;

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
