import { atomWithStorage } from 'jotai/utils';

type AccountsBannerCard = {
  [accountId: string]: boolean;
};

export const profileBannerCardAtom = atomWithStorage(
  'profileBannerCard',
  {} as AccountsBannerCard,
);
