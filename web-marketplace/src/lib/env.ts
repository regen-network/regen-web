import { MARKETPLACE_CLIENT_TYPE } from 'clients/Clients.types';

import { ColorScheme } from 'web-components/src/theme/theme.types';

export const IS_DEV = process.env.DEV;
export const apiServerUrl = process.env.NEXT_PUBLIC_API_URI;
export const SKIPPED_CLASS_ID = process.env.NEXT_PUBLIC_SKIPPED_CLASS_ID;
export const API_URI = process.env.NEXT_PUBLIC_API_URI;
export const IMAGE_STORAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_STORAGE_BASE_URL ??
  'https://regen-registry.s3.amazonaws.com/';
export const CREDIT_CLASS_FILTERS_TO_DESELECT = process.env
  .NEXT_PUBLIC_CREDIT_CLASS_FILTERS_TO_DESELECT
  ? process.env.NEXT_PUBLIC_CREDIT_CLASS_FILTERS_TO_DESELECT.split(',')
  : [];
export const DEFAULT_COMMUNITY_PROJECTS_FILTER =
  process.env.NEXT_PUBLIC_DEFAULT_COMMUNITY_PROJECTS_FILTER === 'true';
export const MARKETPLACE_CLIENT = (process.env.NEXT_PUBLIC_MARKETPLACE_CLIENT ??
  'regen') as MARKETPLACE_CLIENT_TYPE;
export const IS_TERRASOS = MARKETPLACE_CLIENT === 'terrasos';
export const IS_REGEN = MARKETPLACE_CLIENT === 'regen';
export const COLOR_SCHEME: ColorScheme = IS_TERRASOS ? 'terrasos' : 'regen';
export const MARKETPLACE_APP_URL = process.env.NEXT_PUBLIC_MARKETPLACE_APP_URL;
export const LINK_PREFIX = IS_REGEN ? '' : MARKETPLACE_APP_URL;
