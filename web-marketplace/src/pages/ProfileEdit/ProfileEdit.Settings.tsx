import { useState } from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { AccountConnectWalletModal } from 'components/organisms/AccountConnectWalletModal/AccountConnectWalletModal';
import { useLoginData } from 'components/organisms/LoginButton/hooks/useLoginData';
import { UserAccountSettings } from 'components/organisms/UserAccountSettings/UserAccountSettings';
import { WalletProviderInfo } from 'components/organisms/UserAccountSettings/UserAccountSettings.types';

import { useConnectWalletToAccount } from './hooks/useConnectWalletToAccount';
import { useSocialProviders } from './hooks/useSocialProviders';

export const ProfileEditSettings = () => {
  const [error, setError] = useState<unknown>(undefined);
  const { activeAccount, privActiveAccount } = useAuth();
  const hasKeplrAccount = !!activeAccount?.addr;
  const { connect } = useWallet();
  const {
    connecting,
    isModalOpen,
    modalState,
    onButtonClick,
    onModalClose,
    walletsUiConfig,
  } = useLoginData();

  useConnectWalletToAccount({ isConnectModalOpened: isModalOpen, setError });

  // Social providers
  const socialProviders = useSocialProviders();
  const _socialProviders = socialProviders.map(provider => ({
    name: provider.name,
    email: privActiveAccount?.[`${provider.id}_email`],
    connect: privActiveAccount?.[provider.id] ? undefined : provider.connect,
    disconnect: privActiveAccount?.[provider.id]
      ? provider.disconnect
      : undefined,
  }));

  // Keplr account
  const walletProviderInfo: WalletProviderInfo = hasKeplrAccount
    ? { address: String(activeAccount?.addr) }
    : { connect: onButtonClick };

  return (
    <>
      {error && (
        <ErrorBanner
          text={error.toString()}
          onClose={() => setError(undefined)}
        />
      )}
      <UserAccountSettings
        email={privActiveAccount?.email ?? ''}
        socialProviders={_socialProviders}
        walletProvider={walletProviderInfo}
      />
      <AccountConnectWalletModal
        open={isModalOpen}
        onClose={onModalClose}
        wallets={[
          {
            ...walletsUiConfig[0],
            onClick: () => {
              connect &&
                connect({
                  walletType: WalletType.Keplr,
                  doLogin: false,
                });
            },
          },
        ]}
        state={modalState}
        connecting={connecting}
      />
    </>
  );
};
