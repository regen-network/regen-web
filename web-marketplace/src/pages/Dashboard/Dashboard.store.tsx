import { atomWithStorage } from 'jotai/utils';

export const profileBannerCardAtom = atomWithStorage(
  'profileBannerCard',
  false,
);
