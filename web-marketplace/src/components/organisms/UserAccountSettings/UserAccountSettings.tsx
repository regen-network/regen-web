import {Title, Subtitle, Body, Label} from 'web-components/lib/components/typography';
import ContainedButton from "web-components/lib/components/buttons/ContainedButton";
// import {TextField} from "web-components/lib/components/new/TextField";

export const UserAccountSettings = () => {
  return <div>
    <div>
      <Subtitle>Login Email</Subtitle>
      {/*<TextField />*/}
    </div>
    <div>
      <Subtitle>Social Accounts</Subtitle>
      <div>Use your social account to log in to Regen Marketplace. <div>Learn more</div></div>
      <ConnectField provider="Google" connected={false} />
    </div>
    <div>
      <Subtitle>Wallet integration</Subtitle>
      <div>Connect a wallet address to be able to perform on chain tasks such as buying and selling credits, and creating projects on Regen Ledger. <div>Learn more</div></div>
      <ConnectField provider="Keplr or Wallet Connect" connected={false} />
    </div>
  </div>
  // typography
  // contained button
  // text button
  // components/new/TextField
}

interface ConnectFieldProps {
  provider: string
  connected: boolean
}

const ConnectField = ({provider, connected}: ConnectFieldProps) => {
  return <div className="flex flex-row">
    <div>
      <div>{provider}</div>
      <div>{connected ? 'Connected' : 'Not connected'}</div>
    </div>
    <ContainedButton>Connect</ContainedButton>
  </div>
}
