export const IS_DEV = import.meta.env.DEV;
export const apiServerUrl = import.meta.env.VITE_API_URI;
export const SKIPPED_CLASS_ID = import.meta.env.VITE_SKIPPED_CLASS_ID;
export const API_URI = import.meta.env.VITE_API_URI;
export const IMAGE_STORAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_STORAGE_BASE_URL ??
  'https://regen-registry.s3.amazonaws.com/';
