import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { CopyButton } from 'web-components/src/components/buttons/CopyButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import { Body } from 'web-components/src/components/typography';

import { SocialProviderInfo } from './UserAccountSettings.types';

type Props = SocialProviderInfo & {
  connect?: () => void;
  disconnect?: () => void;
  address?: string;
  email?: string | null;
};

/** ConnectField is used internally by the UserAccountSettings component to
 * display a single social or wallet connection.
 */
export const ConnectField = ({
  name,
  connect,
  disconnect,
  address,
  email,
}: Props) => {
  return (
    <div className="flex flex-row justify-between flex-wrap gap-y-10">
      <div className="flex flex-col gap-5">
        <Body size="md" color="info.dark-grey">
          {name}
        </Body>
        {address ? (
          <AddressWidget address={address} />
        ) : (
          <Body size="sm">{email ? email : <Trans>Not connected</Trans>}</Body>
        )}
      </div>
      <div className="ml-auto">
        {connect ? (
          <ContainedButton onClick={connect}>
            <Trans>CONNECT</Trans>
          </ContainedButton>
        ) : (
          disconnect && (
            <OutlinedButton onClick={disconnect}>
              <div className="flex flex-row gap-10 items-center">
                <CloseIcon className="stroke-brand-400 w-[26px] h-[26px]" />
                <div>
                  <Trans>DISCONNECT</Trans>
                </div>
              </div>
            </OutlinedButton>
          )
        )}
      </div>
    </div>
  );
};

const AddressWidget = ({ address }: { address: string }) => {
  const { _ } = useLingui();

  return (
    <div className="flex flex-row gap-5">
      <Body size="sm">{address}</Body>
      <CopyButton
        content={address}
        tooltipText={_(msg`Copy address`)}
        toastText={_(msg`Address copied!`)}
      />
    </div>
  );
};
