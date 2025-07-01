import { useState } from 'react';
import { useLingui } from '@lingui/react';

import ErrorBanner from 'web-components/src/components/banner/ErrorBanner';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { AccountConnectWalletModal } from 'components/organisms/AccountConnectWalletModal/AccountConnectWalletModal';
import { ConnectWalletFlow } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow';
import { useLoginData } from 'components/organisms/LoginButton/hooks/useLoginData';
import { useEmailConfirmationData } from 'components/organisms/LoginFlow/hooks/useEmailConfirmationData';
import { UserAccountSettings } from 'components/organisms/UserAccountSettings/UserAccountSettings';
import { EMAIL_ADDED } from 'components/organisms/UserAccountSettings/UserAccountSettings.constants';
import { WalletProviderInfo } from 'components/organisms/UserAccountSettings/UserAccountSettings.types';

import { useSocialProviders } from './hooks/useSocialProviders';
import { useVerifyToken } from './hooks/useVerifyToken';

export const DashboardEditSettings = () => {
  const { _ } = useLingui();
  const [error, setError] = useState<unknown>(undefined);
  const { activeAccount, privActiveAccount } = useAuth();
  const hasKeplrAccount = !!activeAccount?.addr;
  const { connect } = useWallet();
  const {
    isModalOpen,
    modalState,
    onButtonClick,
    onModalClose,
    walletsUiConfig,
  } = useLoginData({});

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
    : { connect: onButtonClick };

  const emailConfirmationData = useEmailConfirmationData({
    emailConfirmationText: _(EMAIL_ADDED),
  });

  useVerifyToken();

  return (
    <div className="px-10 py-40 md:p-40 bg-white border border-solid border-sc-card-standard-stroke rounded-[5px]">
      {(error as string) && (
        <ErrorBanner
          text={(error as string).toString()}
          onClose={() => setError(undefined)}
        />
      )}
      <UserAccountSettings
        email={privActiveAccount?.email ?? ''}
        socialProviders={_socialProviders}
        walletProvider={walletProviderInfo}
        custodialAddress={activeAccount?.custodialAddress}
        emailConfirmationData={emailConfirmationData}
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
      />
      <ConnectWalletFlow
        isConnectModalOpened={isModalOpen}
        setError={setError}
        onConnectModalClose={onModalClose}
      />
    </div>
  );
};
