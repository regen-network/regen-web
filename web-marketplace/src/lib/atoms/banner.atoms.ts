import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const bannerTextAtom = atom('');
export const isTebuBannerVisibleAtom = atomWithStorage(
  'isTebuBannerVisible',
  true,
);
