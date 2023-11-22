import { useState } from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { useAuth } from 'lib/auth/auth';
import { useSignArbitrary } from 'lib/wallet/hooks/useSignArbitrary';
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
  const signArbitrary = useSignArbitrary({
    setError,
  });
  const connectWalletToAccount = useConnectWalletToAccount({
    setError,
    signArbitrary,
    hasKeplrAccount,
  });
  const {
    connecting,
    isModalOpen,
    modalState,
    onButtonClick,
    onModalClose,
    walletsUiConfig,
  } = useLoginData();

  // Social providers
  const socialProviders = useSocialProviders();
  const _socialProviders = socialProviders.map(p => ({
    name: p.name,
    email: privActiveAccount?.[`${p.id}_email`],
    connect: privActiveAccount?.[p.id] ? undefined : p.connect,
    disconnect: privActiveAccount?.[p.id] ? p.disconnect : undefined,
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
            onClick: async () => {
              connect &&
                (await connect({
                  walletType: WalletType.Keplr,
                  doLogin: false,
                }));
              await connectWalletToAccount();
            },
          },
        ]}
        state={modalState}
        connecting={connecting}
      />
    </>
  );
};
