import { useState } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

interface UserSellOrdersToolbarProps {
  wrapperClassName?: string;
}

export const UserSellOrdersToolbar = ({
  wrapperClassName,
}: UserSellOrdersToolbarProps) => {
  const { _ } = useLingui();
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const { credits } = useFetchEcocredits({});
  const tradableCredits =
    credits?.filter(credit => Number(credit.balance?.tradableAmount) > 0) || [];

  return (
    <>
      <div
        className={cn(
          'p-15 sm:p-20 md:p-30 flex justify-between items-center w-full rounded-tl-xl rounded-tr-xl bg-grey-0 border-b-[1px] border-grey-300 border-solid border-t-0 border-r-0 border-l-0',
          wrapperClassName,
        )}
      >
        <Subtitle size="xl" className="text-base sm:text-[22px]">
          <Trans>Sell orders</Trans>
        </Subtitle>
        <div className="flex-none flex items-center">
          {/* TODO:  If the member is an Editor or Viewer, this button should be hidden */}
          <ContainedButton onClick={() => setIsSellFlowStarted(true)}>
            + <Trans>Create Sell Order</Trans>
          </ContainedButton>
        </div>
      </div>
      <CreateSellOrderFlow
        isFlowStarted={isSellFlowStarted}
        setIsFlowStarted={setIsSellFlowStarted}
        credits={tradableCredits}
        placeholderText={_(msg`Choose batch`)}
      />
    </>
  );
};
