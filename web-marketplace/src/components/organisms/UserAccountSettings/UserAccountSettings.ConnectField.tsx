import { Body } from "web-components/src/components/typography";
import ContainedButton from "web-components/src/components/buttons/ContainedButton";
import OutlinedButton from "web-components/src/components/buttons/OutlinedButton";
import { CopyButton } from "web-components/src/components/buttons/CopyButton";
import React from "react";

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
    <CopyButton content={address} tooltipText="Copy address" toastText="Address copied!"/>
  </div>
);
