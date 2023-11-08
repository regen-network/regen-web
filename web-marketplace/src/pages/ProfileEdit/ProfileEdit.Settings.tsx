import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';

import { UserAccountSettings } from 'components/organisms/UserAccountSettings/UserAccountSettings';

export const ProfileEditSettings = () => {
  const { authenticatedAccounts } = useAuth();
  const googleAccounts = authenticatedAccounts?.filter(
    account => !!account?.email,
  );
  const googleSocialProviders =
    googleAccounts?.map(account => ({
      providerName: `Google`,
      address: `${account?.email}`,
      disconnect: () => undefined,
    })) ?? [];
  const connectGoogleAccount = () =>
    (window.location.href = `${apiServerUrl}/marketplace/v1/auth/google`);

  return (
    <UserAccountSettings
      email="joemcnab@gmail.com"
      socialProviders={[
        {
          providerName: 'Google',
          connect: connectGoogleAccount,
        },
        ...googleSocialProviders,
      ]}
      walletProvider={{
        address: 'regenfoobar3792723djghsdg',
        disconnect: () => undefined,
      }}
    />
  );
};
