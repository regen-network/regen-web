import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';

import { useAuth } from 'lib/auth/auth';

import { useEmailConfirmationData } from 'components/organisms/LoginFlow/hooks/useEmailConfirmationData';
import { UserAccountSettings } from 'components/organisms/UserAccountSettings/UserAccountSettings';
import { EMAIL_ADDED } from 'components/organisms/UserAccountSettings/UserAccountSettings.constants';
import { WalletProviderInfo } from 'components/organisms/UserAccountSettings/UserAccountSettings.types';

import { useDashboardContext } from './Dashboard.context';
import { shouldRedirectToCreateOrgAtom } from './Dashboard.store';
import { useSocialProviders } from './hooks/useSocialProviders';
import { useVerifyToken } from './hooks/useVerifyToken';

export const DashboardSettings = () => {
  const { _ } = useLingui();
  const { activeAccount, privActiveAccount } = useAuth();
  const hasKeplrAccount = !!activeAccount?.addr;
  const { onConnectWalletClick } = useDashboardContext();
  const setShouldRedirectToCreateOrg = useSetAtom(
    shouldRedirectToCreateOrgAtom,
  );

  // Social providers
  const socialProviders = useSocialProviders();
  const _socialProviders = socialProviders.map(provider => ({
    name: provider.name,
    email: privActiveAccount?.[
      `${provider.id}_email` as keyof typeof privActiveAccount
    ] as string | undefined,
    connect: privActiveAccount?.[provider.id as keyof typeof privActiveAccount]
      ? undefined
      : provider.connect,
    disconnect: privActiveAccount?.[
      provider.id as keyof typeof privActiveAccount
    ]
      ? provider.disconnect
      : undefined,
  }));

  // Keplr account
  const walletProviderInfo: WalletProviderInfo = hasKeplrAccount
    ? { address: String(activeAccount?.addr) }
    : {
        connect: () => {
          setShouldRedirectToCreateOrg(false); // reset any org creation redirect
          onConnectWalletClick();
        },
      };

  const emailConfirmationData = useEmailConfirmationData({
    emailConfirmationText: _(EMAIL_ADDED),
  });

  useVerifyToken();

  return (
    <div className="px-10 py-40 md:p-40 bg-bc-neutral-0 border border-solid border-sc-card-standard-stroke rounded-[10px]">
      <UserAccountSettings
        email={privActiveAccount?.email ?? ''}
        socialProviders={_socialProviders}
        walletProvider={walletProviderInfo}
        custodialAddress={activeAccount?.custodialAddress}
        emailConfirmationData={emailConfirmationData}
      />
    </div>
  );
};
