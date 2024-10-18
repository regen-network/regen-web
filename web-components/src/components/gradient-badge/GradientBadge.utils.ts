/* eslint-disable lingui/no-unlocalized-strings */
import { GradientBadgeVariant } from './GradientBadge.types';

export const GradientBadgeVariantMapping: {
  [key in GradientBadgeVariant]: string;
} = {
  green:
    'linear-gradient(202deg, rgba(var(--sc-tag-credit-category-300) / 1) 14.67%, rgba(var(--sc-tag-credit-category-500) / 1) 97.14%)',
};
