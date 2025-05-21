import { useState } from 'react';
import { Trans } from '@lingui/macro';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

export const UserSellOrdersToolbar = ({
  wrapperClassName,
}: {
  wrapperClassName?: string;
}) => {
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);

  // User ecocredits
  const { credits, isLoadingCredits } = useFetchEcocredits({});

  const tradableCredits =
    credits?.filter(credit => Number(credit.balance?.tradableAmount) > 0) || [];

  return (
    <>
      <div
        className={cn(
          'p-0 flex justify-between w-full rounded-tl-xl rounded-tr-xl bg-grey-0 border-b-[1px] border-grey-300 border-solid border-t-0 border-r-0 border-l-0',
          wrapperClassName,
        )}
      >
        <Subtitle size="xl" className="p-30">
          <Trans>Sell orders</Trans>
        </Subtitle>
        <div className="flex-none pt-15 pr-15">
          {/* TODO:  If the member is an Editor or Viewer, this button should be hidden */}
          <ContainedButton
            onClick={() => setIsSellFlowStarted(true)}
            disabled={isLoadingCredits || tradableCredits.length === 0}
          >
            <Trans>Create Sell Order</Trans>
          </ContainedButton>
        </div>
      </div>
      <CreateSellOrderFlow
        isFlowStarted={isSellFlowStarted}
        setIsFlowStarted={setIsSellFlowStarted}
        credits={tradableCredits}
      />
    </>
  );
};
