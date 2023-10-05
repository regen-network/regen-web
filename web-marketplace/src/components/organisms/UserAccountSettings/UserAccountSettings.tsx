import { Subtitle, Body } from 'web-components/lib/components/typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { TextButton } from "web-components/lib/components/buttons/TextButton";

export interface ProviderInfo {
  connected: boolean;
  connect: () => void;
}

export interface SocialProviderInfo extends ProviderInfo {
  providerName: string;
}

export interface UserAccountSettingsProps {
  email: string;
  socialProviders: SocialProviderInfo[];
  walletProvider: ProviderInfo
}

export const UserAccountSettings = ({email, socialProviders, walletProvider}: UserAccountSettingsProps) => {
  return (
    <div className="flex flex-col gap-50 px-50 py-50 bg-white">
      <TextField label="Login Email" value={email} disabled={true} />
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle size="lg">Social Accounts</Subtitle>
          <Body size="sm" color="info.dark-grey">
            Use your social account to log in to Regen Marketplace. <a>Learn more</a>
          </Body>
        </div>
        {
          socialProviders.map((provider) => (
            <ConnectField {...provider} />
          ))
        }
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
        <ConnectField providerName="Keplr or Wallet Connect" {...walletProvider} />
      </div>
    </div>
  );
};

const ConnectField = ({ providerName, connected, connect }: SocialProviderInfo) => {
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
