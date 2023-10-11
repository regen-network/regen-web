import { Subtitle, Body } from 'web-components/lib/components/typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { UserAccountSettingsProps } from './UserAccountSettings.types';
import React from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

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
            {/* TODO: add link or button to learn more when we have the content ready */}
            <a>Learn more»</a>
          </Body>
        </div>
        <div className="flex flex-col">
          {socialProviders.map(provider => (
            <div
              className="border-0 border-b border-solid border-grey-200 py-20
            first:pt-0 last:pb-0 last:border-b-0"
            >
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
            Ledger.&nbsp;
            {/* TODO: add link or button to learn more when we have the content ready */}
            <a>Learn more»</a>
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
  connect,
  disconnect,
  address,
}: {
  providerName: string;
  connect?: () => void;
  disconnect?: () => void;
  address?: string;
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-5">
        <Body size="md" color="info.dark-grey">
          {providerName}
        </Body>
        {address ? (
          <AddressWidget address={address} />
        ) : (
          <Body size="sm">{connect ? 'Disconnected' : 'Connected'}</Body>
        )}
      </div>
      <div>
        {connect ? (
          <ContainedButton onClick={connect}>CONNECT</ContainedButton>
        ) : (
          <OutlinedButton onClick={disconnect}>
            <div className="flex flex-row gap-10 items-center">
              {/* the SVG source for this icon is included inline so that styling with tailwind works */}
              <svg className="stroke-secondary-main" width="24" height="24" fill="none">
                <rect width="2" height="17.958" x="6.414" y="19.113" fill="#545555" rx=".25" transform="rotate(-135 6.414 19.113)"/><rect width="2" height="17.958" fill="#545555" rx=".25" transform="scale(1 -1) rotate(45 32.021 11.83)"/>
              </svg>
              <div>DISCONNECT</div>
            </div>
          </OutlinedButton>
        )}
      </div>
    </div>
  );
};

const AddressWidget = ({ address }: { address: string }) => (
  <div className="flex flex-row gap-5">
    <Body size="sm">{address}</Body>
    <svg width="24" height="24" fill="none"
         onClick={() => {
           navigator.clipboard.writeText(address);
         }}
         className="cursor-pointer hover:stroke-grey-300"
    >
      <path fill="#000" fillRule="evenodd" d="M19 8v9H9.25a.25.25 0 0 1-.25-.25V3h5v4.25c0 .414.336.75.75.75H19Zm-4-4.586L18.287 7H15V3.414ZM3.25 5H7V1.25A.25.25 0 0 1 7.25 1h8.14c.07 0 .137.03.184.081l5.36 5.847a.25.25 0 0 1 .066.17V18.75a.25.25 0 0 1-.25.25H17v3.75a.25.25 0 0 1-.25.25H3.25a.25.25 0 0 1-.25-.25V5.25A.25.25 0 0 1 3.25 5ZM7 16.75V7H5v14h10v-2H7.25a.25.25 0 0 1-.25-.25v-2Z" clipRule="evenodd"/>
    </svg>
  </div>
);
