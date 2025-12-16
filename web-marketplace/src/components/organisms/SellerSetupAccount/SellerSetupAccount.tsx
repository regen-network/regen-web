import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useDashboardContext } from 'legacy-pages/Dashboard/Dashboard.context';
import Image from 'next/image';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Card from 'web-components/src/components/cards/Card';
import { Title } from 'web-components/src/components/typography';

import stripeLogo from '../../../../public/png/logo/stripe.png';
import tokenization from '../../../../public/svg/tokenization.svg';
import { useStripeAccount } from './hooks/useStripeAccount';

const SellerSetupAccount = () => {
  const { selectedAccount } = useDashboardContext();
  const { setupAccount, openLoginLink } = useStripeAccount();
  const { _ } = useLingui();

  return (
    selectedAccount?.canUseStripeConnect && (
      <Card className="rounded-[10px] border-sc-card-standard-stroke shadow-none p-20 sm:p-30 relative mb-20">
        <Title variant="h5" className="pb-20 relative z-1">
          <Trans>Manage your Stripe account for fiat purchases</Trans>
        </Title>
        <div className="flex items-center">
          {selectedAccount?.stripeConnectedAccountId ? (
            <ContainedButton onClick={openLoginLink} className="z-1">
              <Trans>view transactions</Trans>
            </ContainedButton>
          ) : (
            <ContainedButton onClick={setupAccount} className="z-1">
              <Trans>set up account</Trans>
            </ContainedButton>
          )}
          <Image
            className="hidden sm:block sm:ml-20"
            src={stripeLogo}
            // eslint-disable-next-line lingui/no-unlocalized-strings
            alt="stripe logo"
          />
        </div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          className="sm:h-[224px] sm:w-[224px] w-[168px] h-[168px] absolute right-0 sm:top-[-20px] top-40"
          src={tokenization}
          alt={_(msg`tokenization`)}
        />
      </Card>
    )
  );
};
export { SellerSetupAccount };
