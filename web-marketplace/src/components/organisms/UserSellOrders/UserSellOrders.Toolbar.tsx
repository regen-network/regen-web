import { lazy, Suspense, useEffect, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useDashboardContext } from 'legacy-pages/Dashboard/Dashboard.context';
import { useFetchEcocredits } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { BRIDGE_CLASS_ID } from 'lib/env';
import { useWallet } from 'lib/wallet/wallet';

import { CreateButton } from './UserSellOrders.CreateButton';

const CreateSellOrderFlow = lazy(async () => ({
  default: (
    await import('features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow')
  ).CreateSellOrderFlow,
}));

interface UserSellOrdersToolbarProps {
  wrapperClassName?: string;
  refetchSellOrders: () => void;
  canManageSellOrders?: boolean;
  accountAddress?: string;
}

export const UserSellOrdersToolbar = ({
  wrapperClassName,
  refetchSellOrders,
  canManageSellOrders = true,
  accountAddress,
}: UserSellOrdersToolbarProps) => {
  const { selectedAccount } = useDashboardContext();
  const { _ } = useLingui();
  const { loginDisabled, wallet } = useWallet();

  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const sellerAddress = accountAddress ?? wallet?.address;
  const { credits, reloadBalances } = useFetchEcocredits({
    address: sellerAddress,
    isPaginatedQuery: false,
  });
  const tradableCredits =
    credits?.filter(
      credit =>
        Number(credit.balance?.tradableAmount) > 0 &&
        credit.classId !== BRIDGE_CLASS_ID,
    ) || [];
  const hasTradableCredits = tradableCredits.length > 0;
  const canStartSellFlow = canManageSellOrders && hasTradableCredits;

  useEffect(() => {
    if (isSellFlowStarted) {
      reloadBalances();
    }
  }, [isSellFlowStarted, reloadBalances]);

  return (
    <>
      <div
        className={cn(
          'p-15 sm:p-25 flex justify-between items-center w-full bg-grey-0 border-b-[1px] border-grey-200 border-solid border-t-0 border-r-0 border-l-0',
          wrapperClassName,
        )}
      >
        <Subtitle size="xl" className="text-base sm:text-[22px] pt-3">
          <Trans>Open sell orders</Trans>
        </Subtitle>
        {canManageSellOrders && (
          <div className="flex sm:flex-row flex-col sm:items-center items-end">
            <div className="sm:order-2 order-1">
              {hasTradableCredits ? (
                <CreateButton
                  hasTradableCredits={true}
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
                      hasTradableCredits={false}
                      setIsSellFlowStarted={setIsSellFlowStarted}
                    />
                  </div>
                </InfoTooltip>
              )}
            </div>
          </div>
        )}
      </div>
      {canStartSellFlow && isSellFlowStarted && (
        <Suspense fallback={null}>
          <CreateSellOrderFlow
            isFlowStarted={isSellFlowStarted}
            setIsFlowStarted={setIsSellFlowStarted}
            credits={tradableCredits}
            refetchSellOrders={refetchSellOrders}
            redirectOnSuccess={false}
            canCreateFiatOrder={
              !!selectedAccount?.canUseStripeConnect &&
              !!selectedAccount?.stripeConnectedAccountId &&
              !loginDisabled
            }
            accountAddress={sellerAddress}
          />
        </Suspense>
      )}
    </>
  );
};
