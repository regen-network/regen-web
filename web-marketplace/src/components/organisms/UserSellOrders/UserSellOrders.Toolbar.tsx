import { lazy, Suspense, useState } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { useAuth } from 'lib/auth/auth';

import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

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
  const walletConnect = !activeAccount && !privActiveAccount;

  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const { credits } = useFetchEcocredits({ isPaginatedQuery: false });
  const tradableCredits =
    credits?.filter(credit => Number(credit.balance?.tradableAmount) > 0) || [];
  const hasTradableCredits = tradableCredits.length > 0;

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
        <div className="flex items-center">
          {walletConnect && (
            <span className="mr-20 italic text-grey-500 text-[12px] w-[190px] text-right">
              <Trans>
                You cannot make USD sell orders while logged in with Wallet
                Connect.
              </Trans>
            </span>
          )}
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
              !!activeAccount?.stripeConnectedAccountId &&
              !walletConnect
            }
          />
        </Suspense>
      )}
    </>
  );
};
