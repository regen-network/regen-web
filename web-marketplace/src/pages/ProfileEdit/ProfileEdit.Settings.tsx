import { useState } from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { useSignArbitrary } from 'lib/wallet/hooks/useSignArbitrary';
import { useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { AccountConnectWalletModal } from 'components/organisms/AccountConnectWalletModal/AccountConnectWalletModal';
import { useLoginData } from 'components/organisms/LoginButton/hooks/useLoginData';
import { UserAccountSettings } from 'components/organisms/UserAccountSettings/UserAccountSettings';
import {
  SocialProviderInfo,
  WalletProviderInfo,
} from 'components/organisms/UserAccountSettings/UserAccountSettings.types';

import { useConnectKeplrWallet } from './hooks/useConnectKeplrWallet';

export const ProfileEditSettings = () => {
  const [error, setError] = useState<unknown>(undefined);
  const { authenticatedAccounts, activeAccount } = useAuth();

  const { connect } = useWallet();

  const {
    connecting,
    isModalOpen,
    modalState,
    onButtonClick,
    onModalClose,
    walletsUiConfig,
  } = useLoginData();

  const signArbitrary = useSignArbitrary({
    setError,
  });

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
  const hasKeplrAccount = !!activeAccount?.addr;
  const walletProviderInfo: WalletProviderInfo = hasKeplrAccount
    ? { address: String(activeAccount?.addr) }
    : { connect: onButtonClick };

  useConnectKeplrWallet({
    setError,
    signArbitrary,
    hasKeplrAccount,
  });

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
      <AccountConnectWalletModal
        open={isModalOpen}
        onClose={onModalClose}
        wallets={[
          {
            ...walletsUiConfig[0],
            onClick: () =>
              connect &&
              connect({ walletType: WalletType.Keplr, doLogin: false }),
          },
        ]}
        state={modalState}
        connecting={connecting}
      />
    </>
  );
};
