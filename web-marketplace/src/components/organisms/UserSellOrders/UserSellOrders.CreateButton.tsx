import { Trans } from '@lingui/macro';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';

import { UseStateSetter } from 'types/react/use-state';

type Props = {
  setIsSellFlowStarted: UseStateSetter<boolean>;
  hasTradableCredits: boolean;
};
export const CreateButton = ({
  setIsSellFlowStarted,
  hasTradableCredits,
}: Props) => (
  <div className="flex-none flex items-center">
    {/* TODO:  If the member is an Editor or Viewer, this button should be hidden */}
    <ContainedButton
      disabled={!hasTradableCredits}
      onClick={() => setIsSellFlowStarted(true)}
    >
      + <Trans>Create Sell Order</Trans>
    </ContainedButton>
  </div>
);
