import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { Body, Subtitle } from 'web-components/lib/components/typography';

import { ConnectField } from './UserAccountSettings.ConnectField';
import { UserAccountSettingsProps } from './UserAccountSettings.types';

/** UserAccountSettings is a component for displaying and managing a user's
 * account settings.
 *
 * The component doesn't specify its own width, background color or padding, so
 * it should be wrapped in a container that provides those styles.
 */
export const UserAccountSettings = ({
  email,
  socialProviders,
  walletProvider,
}: UserAccountSettingsProps) => {
  return (
    <div className="flex flex-col gap-50">
      <TextField label="Login Email" value={email} disabled={true} />
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle size="lg">Social Accounts</Subtitle>
          <Body size="sm" color="info.dark-grey">
            Use your social account to log in to Regen Marketplace.&nbsp;
            {/* TODO: add link when we have the content ready */}
            {/* <a>Learn more»</a> */}
          </Body>
        </div>
        <div className="flex flex-col">
          {socialProviders.map(provider => (
            <div
              key={`${provider.name}`}
              className="border-0 border-b border-solid border-grey-300 py-20
            first:pt-0 last:pb-0 last:border-b-0"
            >
              <ConnectField {...provider} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-30">
        <div className="flex flex-col gap-10">
          <Subtitle size="lg">Wallet integration</Subtitle>
          <Body size="sm" color="info.dark-grey">
            Connect a wallet address to be able to perform on chain tasks such
            as buying and selling credits, and creating projects on Regen
            Ledger.&nbsp;
            {/* TODO: add link when we have the content ready */}
            {/* <a>Learn more»</a> */}
          </Body>
        </div>
        <ConnectField name="Keplr" {...walletProvider} />
      </div>
    </div>
  );
};
