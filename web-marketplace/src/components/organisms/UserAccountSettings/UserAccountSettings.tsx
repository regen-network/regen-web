import { Subtitle, Body } from 'web-components/lib/components/typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';

export const UserAccountSettings = () => {
  return (
    <div className="flex flex-col gap-12 px-10 py-12">
      <div className="flex flex-col gap-1">
        <Subtitle size="lg">Login Email</Subtitle>
        <TextField value="joemcnab@gmail.com" />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <Subtitle size="lg">Social Accounts</Subtitle>
          <Body size="sm">
            Use your social account to log in to Regen Marketplace.{' '}
            <a>Learn more</a>
          </Body>
        </div>
        <ConnectField provider="Google" connected={false} />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <Subtitle>Wallet integration</Subtitle>
          <div>
            Connect a wallet address to be able to perform on chain tasks such
            as buying and selling credits, and creating projects on Regen
            Ledger. <a>Learn more</a>
          </div>
        </div>
        <ConnectField provider="Keplr or Wallet Connect" connected={false} />
      </div>
    </div>
  );
  // typography
  // contained button
  // text button
  // components/new/TextField
};

interface ConnectFieldProps {
  provider: string;
  connected: boolean;
}

const ConnectField = ({ provider, connected }: ConnectFieldProps) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-1">
        <Body size="md">{provider}</Body>
        <Body size="sm">{connected ? 'Connected' : 'Not connected'}</Body>
      </div>
      <ContainedButton>Connect</ContainedButton>
    </div>
  );
};
