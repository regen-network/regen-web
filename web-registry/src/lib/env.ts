export const IS_DEV = process.env.NODE_ENV === 'development';
export const apiServerUrl = process.env.REACT_APP_API_URI;
export const SKIPPED_CLASS_ID = process.env.REACT_APP_SKIPPED_CLASS_ID;
export const IMAGE_STORAGE_BASE_URL =
  process.env.REACT_APP_IMAGE_STORAGE_BASE_URL ??
  'https://regen-registry.s3.amazonaws.com/';
