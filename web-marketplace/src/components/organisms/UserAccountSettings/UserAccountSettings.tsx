import { Subtitle, Body } from 'web-components/lib/components/typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { UserAccountSettingsProps } from "./UserAccountSettings.types";
import React from "react";
import Copy from '../../../assets/svgs/copy.svg';

/** UserAccountSettings is a component for displaying and managing a user's
 * account settings.
 *
 * The component doesn't specify its own width, so it should be wrapped in a
 * container that specifies the width.
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
            {/* TODO: add link or button to learn more when we have the content ready */}
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
            Ledger.
            {/* TODO: add link or button to learn more when we have the content ready */}
            <a>Learn more</a>
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
  address
}: {providerName: string, connect?: () => void, disconnect?: () => void, address?: string}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-5">
        <Body size="md" color="info.dark-grey">
          {providerName}
        </Body>
        {address ?
          <AddressWidget address={address} /> :
          <Body size="sm">{connect ? 'Disconnected' : 'Connected'}</Body>
        }
      </div>
      <div>
        {connect ?
          <ContainedButton onClick={connect}>Connect</ContainedButton> :
          <ContainedButton onClick={disconnect}>Connect</ContainedButton>
        }
      </div>
    </div>
  );
};

const AddressWidget = ({ address }: { address: string }) =>
  <div className="flex flex-row gap-5">
    <Body size="sm">{address}</Body>
    <img
      src={Copy}
      alt="Copy address"
      onClick={() => {
        navigator.clipboard.writeText(address);
      }}
      className="cursor-pointer"
    />
  </div>
