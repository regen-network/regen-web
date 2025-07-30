import { lazy, Suspense, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useFetchEcocredits } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { useAuth } from 'lib/auth/auth';

import { CreateButton } from './UserSellOrders.CreateButton';

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
  const { privActiveAccount, activeAccount } = useAuth();

  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const { credits } = useFetchEcocredits({ isPaginatedQuery: false });
  const tradableCredits =
    credits?.filter(credit => Number(credit.balance?.tradableAmount) > 0) || [];
  const hasTradableCredits = tradableCredits.length > 0;

  return (
    <>
      <div
        className={cn(
          'p-15 sm:p-20 md:p-30 flex justify-between items-center w-full rounded-tl-xl rounded-tr-xl bg-grey-0 border-b-[1px] border-grey-200 border-solid border-t-0 border-r-0 border-l-0',
          wrapperClassName,
        )}
      >
        <Subtitle size="xl" className="text-base sm:text-[22px]">
          <Trans>Sell orders</Trans>
        </Subtitle>
        {hasTradableCredits ? (
          <CreateButton
            hasTradableCredits={hasTradableCredits}
            setIsSellFlowStarted={setIsSellFlowStarted}
          />
        ) : (
          <InfoTooltip
            arrow
            placement="top"
            title={_(msg`You have no tradable credits that can be sold.`)}
          >
            <div>
              <CreateButton
                hasTradableCredits={hasTradableCredits}
                setIsSellFlowStarted={setIsSellFlowStarted}
              />
            </div>
          </InfoTooltip>
        )}
      </div>
      {hasTradableCredits && isSellFlowStarted && (
        <Suspense fallback={null}>
          <CreateSellOrderFlow
            isFlowStarted={isSellFlowStarted}
            setIsFlowStarted={setIsSellFlowStarted}
            credits={tradableCredits}
            refetchSellOrders={refetchSellOrders}
            redirectOnSuccess={false}
            canCreateFiatOrder={
              !!privActiveAccount?.can_use_stripe_connect &&
              !!activeAccount?.stripeConnectedAccountId
            }
          />
        </Suspense>
      )}
    </>
  );
};
