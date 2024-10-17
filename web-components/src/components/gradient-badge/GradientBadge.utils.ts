/* eslint-disable lingui/no-unlocalized-strings */
import { GradientBadgeVariant } from './GradientBadge.types';

export const GradientBadgeVariantMapping: {
  [key in GradientBadgeVariant]: string;
} = {
  green:
    'linear-gradient(179deg, rgba(var(--sc-tag-prefinance-600) / 1) 19.77%, rgba(var(--sc-tag-prefinance-500) / 1) 114.05%, rgba(var(--sc-tag-prefinance-400) / 1) 200.67%)',
};
