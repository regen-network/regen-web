import { Subtitle, Body } from 'web-components/lib/components/typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';

/**
 * Describes the props for the UserAccountSettings component.
 */
export interface UserAccountSettingsProps {
  /**
   * The user's login email.
   */
  email: string;

  /**
   * A list of social providers that the user can connect to.
   */
  socialProviders: SocialProviderInfo[];

  /**
   * The wallet provider that the user can connect to.
   */
  walletProvider: ProviderConnectionInfo;
}

/**
 * Describes the connection status of a provider and provides a callback
 * for connecting to it.
 */
export interface ProviderConnectionInfo {
  /**
   * True if the provider is connected.
   */
  connected: boolean;

  /**
   * A callback for connecting to the provider.
   * It should not be called if connected is true.
   */
  connect: () => void;
}

/**
 * SocialProviderInfo describes a social provider and its connection info.
 */
export interface SocialProviderInfo extends ProviderConnectionInfo {
  /** The name of the social provider. */
  providerName: string;
}

/** UserAccountSettings is a component for displaying and managing a user's
 * account settings.
 */
export const UserAccountSettings = ({
  email,
  socialProviders,
  walletProvider,
}: UserAccountSettingsProps) => {
  return (
    <div className="flex flex-col gap-50 px-50 py-50 bg-primary-main">
      <TextField label="Login Email" value={email} disabled={true} />
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle size="lg">Social Accounts</Subtitle>
          <Body size="sm" color="info.dark-grey">
            Use your social account to log in to Regen Marketplace.{' '}
            <a>Learn more</a>
          </Body>
        </div>
        <div className="flex flex-col">
          {socialProviders.map(provider => (
            <div className="border-0 border-b border-solid border-lines-grey py-20
            first:pt-0 last:pb-0 last:border-b-0">
              <ConnectField {...provider} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle>Wallet integration</Subtitle>
          <Body size="sm" color="info.dark-grey">
            Connect a wallet address to be able to perform on chain tasks such
            as buying and selling credits, and creating projects on Regen
            Ledger. <a>Learn more</a>
          </Body>
        </div>
        <ConnectField
          providerName="Keplr or Wallet Connect"
          {...walletProvider}
        />
      </div>
    </div>
  );
};

const ConnectField = ({
  providerName,
  connected,
  connect,
}: SocialProviderInfo) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-5">
        <Body size="md" color="info.dark-grey">
          {providerName}
        </Body>
        <Body size="sm">{connected ? 'Connected' : 'Not connected'}</Body>
      </div>
      <ContainedButton onClick={connect}>Connect</ContainedButton>
    </div>
  );
};
