import { Subtitle, Body } from 'web-components/lib/components/typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';

export const UserAccountSettings = () => {
  return (
    <div className="flex flex-col gap-50 px-50 py-50 bg-white">
      <div className="flex flex-col gap-5">
        <Subtitle size="lg">Login Email</Subtitle>
        {/*<input className="h-60 px-15" value="joemcnab@gmail.com" />*/}
        <TextField value="joemcnab@gmail.com" disabled={true} />
      </div>
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle size="lg">Social Accounts</Subtitle>
          <Body size="sm" color="info.dark-grey">
            {/*Maybe use TextButton for "Learn more" link?*/}
            Use your social account to log in to Regen Marketplace.{' '} <a>Learn more</a>
          </Body>
        </div>
        <ConnectField provider="Google" connected={false} />
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
        <ConnectField provider="Keplr or Wallet Connect" connected={false} />
      </div>
    </div>
  );
};

interface ConnectFieldProps {
  provider: string;
  connected: boolean;
}

const ConnectField = ({ provider, connected }: ConnectFieldProps) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-5">
        <Body size="md" color="info.dark-grey">{provider}</Body>
        <Body size="sm">{connected ? 'Connected' : 'Not connected'}</Body>
      </div>
      <ContainedButton>Connect</ContainedButton>
    </div>
  );
};
