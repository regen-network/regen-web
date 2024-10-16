/* eslint-disable lingui/no-unlocalized-strings */
import { GradientBadgeVariant } from './GradientBadge.types';

export const GradientBadgeVariantMapping: {
  [key in GradientBadgeVariant]: string;
} = {
  green: 'linear-gradient(201.8deg, #4FB573 14.67%, #B9E1C7 97.14%)',
  yellow:
    'linear-gradient(179deg, #FFCD00 19.77%, #FFCD00 114.05%, #FFCD00 200.67%)',
};
