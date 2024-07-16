export const IMAGE_STORAGE_BASE_URL = import.meta.env
  .VITE_IMAGE_STORAGE_BASE_URL;
export const API_URI = import.meta.env.VITE_API_URI;
export const VIEW_ECOCREDITS = 'view your ecocredits';
export const PROJECTS_PER_PAGE = 6;

export const sortOptions = [
  { label: 'Featured projects', value: 'featured-projects' },
  { label: 'Price  - low to high', value: 'price-ascending' },
  { label: 'Price  - high to low', value: 'price-descending' },
  { label: 'Credits available  - low to high', value: 'credits-ascending' },
  { label: 'Credits available  - high to low', value: 'credits-descending' },
];
