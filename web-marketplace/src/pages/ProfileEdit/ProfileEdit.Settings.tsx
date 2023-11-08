import { useState } from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { useSignArbitrary } from 'lib/wallet/hooks/useSignArbitrary';

import { UserAccountSettings } from 'components/organisms/UserAccountSettings/UserAccountSettings';
import {
  SocialProviderInfo,
  WalletProviderInfo,
} from 'components/organisms/UserAccountSettings/UserAccountSettings.types';

import { useConnectKeplrWallet } from './hooks/useConnectKeplrWallet';

export const ProfileEditSettings = () => {
  const [error, setError] = useState<unknown>(undefined);
  const { authenticatedAccounts, activeAccount } = useAuth();

  const signArbitrary = useSignArbitrary({
    setError,
  });
  const connectWallet = useConnectKeplrWallet({ setError, signArbitrary });

  // Google accounts
  const googleAccounts = authenticatedAccounts?.filter(
    account => !!account?.email,
  );
  const googleSocialProviders: SocialProviderInfo[] =
    googleAccounts?.map(account => ({
      providerName: `Google`,
      address: `${account?.email}`,
      disconnect: () => undefined,
    })) ?? [];
  const connectGoogleAccount = () =>
    (window.location.href = `${apiServerUrl}/marketplace/v1/auth/google`);

  // Keplr accounts
  const keplrAccount = authenticatedAccounts?.find(account => !!account?.addr);
  const walletProviderInfo: WalletProviderInfo = keplrAccount
    ? { address: String(keplrAccount.addr), disconnect: () => void 0 }
    : { connect: connectWallet };

  return (
    <>
      {error && (
        <ErrorBanner
          text={error.toString()}
          onClose={() => setError(undefined)}
        />
      )}
      <UserAccountSettings
        email={activeAccount?.email ?? ''}
        socialProviders={[
          {
            providerName: 'Google',
            connect: connectGoogleAccount,
          },
          ...googleSocialProviders,
        ]}
        walletProvider={walletProviderInfo}
      />
    </>
  );
};
