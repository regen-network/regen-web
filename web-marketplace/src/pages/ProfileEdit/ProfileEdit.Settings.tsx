import { useState } from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { useSignArbitrary } from 'lib/wallet/hooks/useSignArbitrary';
import { useWallet } from 'lib/wallet/wallet';

import { AccountConnectWalletModal } from 'components/organisms/AccountConnectWalletModal/AccountConnectWalletModal';
import { useLoginData } from 'components/organisms/LoginButton/hooks/useLoginData';
import { MobileSigningModal } from 'components/organisms/LoginButton/LoginButton.SigningModal';
import { UserAccountSettings } from 'components/organisms/UserAccountSettings/UserAccountSettings';
import {
  SocialProviderInfo,
  WalletProviderInfo,
} from 'components/organisms/UserAccountSettings/UserAccountSettings.types';

import { useConnectKeplrWallet } from './hooks/useConnectKeplrWallet';

export const ProfileEditSettings = () => {
  const [error, setError] = useState<unknown>(undefined);
  const { authenticatedAccounts, activeAccount } = useAuth();
  const { walletConnectUri, wallet } = useWallet();

  const {
    connecting,
    isModalOpen,
    modalState,
    onButtonClick,
    onModalClose,
    qrCodeUri,
    isWaitingForSigning,
    setIsWaitingForSigningAtom,
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
  const isCurrrentAddressAuthenticated =
    authenticatedAccounts?.some(account => account?.addr === wallet?.address) ??
    false;
  const walletProviderInfo: WalletProviderInfo = hasKeplrAccount
    ? { address: String(activeAccount?.addr), disconnect: () => void 0 }
    : { connect: onButtonClick };

  useConnectKeplrWallet({
    setError,
    signArbitrary,
    hasKeplrAccount,
    isCurrrentAddressAuthenticated,
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
        wallets={walletsUiConfig}
        state={modalState}
        qrCodeUri={qrCodeUri}
        connecting={connecting}
      />
      <MobileSigningModal
        isOpen={isWaitingForSigning && !!walletConnectUri}
        onClose={() => setIsWaitingForSigningAtom(false)}
      />
    </>
  );
};
