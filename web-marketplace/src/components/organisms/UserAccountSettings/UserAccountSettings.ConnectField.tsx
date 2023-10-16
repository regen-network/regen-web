import React from 'react';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { CopyButton } from 'web-components/lib/components/buttons/CopyButton';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { Body } from 'web-components/lib/components/typography';
import CloseIcon from "web-components/lib/components/icons/CloseIcon";

/** ConnectField is used internally by the UserAccountSettings component to
 * display a single social or wallet connection.
 */
export const ConnectField = ({
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
    <div className="flex flex-row justify-between flex-wrap gap-y-10">
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
              <CloseIcon className="stroke-brand-400 w-[26px] h-[26px]" />
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
    <CopyButton
      content={address}
      tooltipText="Copy address"
      toastText="Address copied!"
    />
  </div>
);
