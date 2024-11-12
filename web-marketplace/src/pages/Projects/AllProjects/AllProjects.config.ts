import { msg } from '@lingui/macro';

import { IS_REGEN } from 'lib/env';

export const IMAGE_STORAGE_BASE_URL = import.meta.env
  .VITE_IMAGE_STORAGE_BASE_URL;
export const API_URI = import.meta.env.VITE_API_URI;
export const VIEW_ECOCREDITS = 'view your ecocredits';
export const PROJECTS_PER_PAGE = IS_REGEN ? 6 : 9;

export const sortOptions = [
  { label: msg`Featured projects`, value: 'featured-projects' },
  { label: msg`Price - low to high`, value: 'price-ascending' },
  { label: msg`Price - high to low`, value: 'price-descending' },
  {
    label: msg`Credits available - low to high`,
    value: 'credits-ascending',
  },
  {
    label: msg`Credits available - high to low`,
    value: 'credits-descending',
  },
];
