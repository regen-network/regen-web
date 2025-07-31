import { Trans } from '@lingui/macro';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Card from 'web-components/src/components/cards/Card';
import { Title } from 'web-components/src/components/typography';

import { useAuth } from 'lib/auth/auth';

import { useStripeAccount } from './hooks/useStripeAccount';

const SellerSetupAccount = () => {
  const { activeAccount, privActiveAccount } = useAuth();
  const { setupAccount, openLoginLink } = useStripeAccount();

  return (
    privActiveAccount?.can_use_stripe_connect && (
      <Card className="rounded-[10px] border-sc-card-standard-stroke shadow-none p-20 sm:p-30 relative mb-20">
        <Title variant="h5" className="pb-20 relative z-1">
          <Trans>Manage your Stripe account for fiat purchases</Trans>
        </Title>
        <div className="flex items-center">
          {activeAccount?.stripeConnectedAccountId ? (
            <ContainedButton onClick={openLoginLink} className="z-1">
              <Trans>view transactions</Trans>
            </ContainedButton>
          ) : (
            <ContainedButton onClick={setupAccount} className="z-1">
              <Trans>set up account</Trans>
            </ContainedButton>
          )}
          <img
            className="hidden sm:block sm:pl-20"
            src="/png/logo/stripe.png"
            // eslint-disable-next-line lingui/no-unlocalized-strings
            alt="stripe logo"
          />
        </div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          className="sm:h-[224px] sm:w-[224px] w-[168px] h-[168px] absolute right-0 sm:top-[-20px] top-40"
          src="/svg/tokenization.svg"
        />
      </Card>
    )
  );
};
export { SellerSetupAccount };
