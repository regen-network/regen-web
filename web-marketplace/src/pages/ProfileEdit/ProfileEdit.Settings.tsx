import { UserAccountSettings } from 'components/organisms/UserAccountSettings/UserAccountSettings';

export const ProfileEditSettings = () => {
  return (
    <UserAccountSettings
      email="joemcnab@gmail.com"
      socialProviders={[
        {
          providerName: 'Google',
          connect: () => undefined,
        },
      ]}
      walletProvider={{
        address: 'regenfoobar3792723djghsdg',
        disconnect: () => undefined,
      }}
    />
  );
};
