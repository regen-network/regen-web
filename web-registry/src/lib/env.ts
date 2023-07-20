export const IS_DEV = import.meta.env.NODE_ENV === 'development';
export const apiServerUrl = import.meta.env.VITE_API_URI;
export const SKIPPED_CLASS_ID = import.meta.env.VITE_SKIPPED_CLASS_ID;
export const IMAGE_STORAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_STORAGE_BASE_URL ??
  'https://regen-registry.s3.amazonaws.com/';
