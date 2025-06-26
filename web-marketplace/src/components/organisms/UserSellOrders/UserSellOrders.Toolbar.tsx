import { lazy, Suspense, useState } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

const CreateSellOrderFlow = lazy(async () => ({
  default: (
    await import('features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow')
  ).CreateSellOrderFlow,
}));

interface UserSellOrdersToolbarProps {
  wrapperClassName?: string;
  refetchSellOrders: () => void;
}

export const UserSellOrdersToolbar = ({
  wrapperClassName,
  refetchSellOrders,
}: UserSellOrdersToolbarProps) => {
  const { _ } = useLingui();
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const { credits } = useFetchEcocredits({ isPaginatedQuery: false });
  const tradableCredits =
    credits?.filter(credit => Number(credit.balance?.tradableAmount) > 0) || [];
  const hasTradableCredits = tradableCredits.length > 0;

  const createButton = (
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
        {hasTradableCredits ? (
          createButton
        ) : (
          <InfoTooltip
            arrow
            placement="top"
            title={_(msg`You have no tradable credits that can be sold.`)}
          >
            {createButton}
          </InfoTooltip>
        )}
      </div>
      {hasTradableCredits && isSellFlowStarted && (
        <Suspense fallback={null}>
          <CreateSellOrderFlow
            isFlowStarted={isSellFlowStarted}
            setIsFlowStarted={setIsSellFlowStarted}
            credits={tradableCredits}
            placeholderText={_(msg`Choose batch`)}
            refetchSellOrders={refetchSellOrders}
            redirectOnSuccess={false}
          />
        </Suspense>
      )}
    </>
  );
};
