import { atomWithStorage, createJSONStorage } from 'jotai/utils';

type AccountsBannerCard = {
  [accountId: string]: boolean;
};

export const profileBannerCardAtom = atomWithStorage(
  'profileBannerCard',
  {} as AccountsBannerCard,
);

const dashboardSessionStorage = createJSONStorage<boolean>(
  () => sessionStorage,
);

export const dashboardConnectWalletFlowAtom = atomWithStorage<boolean>(
  'dashboardConnectWalletFlowActive',
  false,
  dashboardSessionStorage,
);

export const shouldRedirectToCreateOrgAtom = atomWithStorage<boolean>(
  'shouldRedirectToCreateOrg',
  false,
  dashboardSessionStorage,
);
