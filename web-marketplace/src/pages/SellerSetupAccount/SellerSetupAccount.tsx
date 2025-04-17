import { Trans } from '@lingui/macro';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';

import { useAuth } from 'lib/auth/auth';

import { useStripeAccount } from './hooks/useStripeAccount';

const SellerSetupAccount = () => {
  const { activeAccount } = useAuth();
  const { setupAccount, openLoginLink } = useStripeAccount();

  return (
    <div className="bg-grey-100 h-[500px]">
      {activeAccount?.stripeConnectedAccountId ? (
        <div className="flex flex-col sm:flex-row gap-20 ">
          <ContainedButton onClick={openLoginLink}>
            <Trans>view payouts</Trans>
          </ContainedButton>
          <OutlinedButton>
            <Trans>view stripe account</Trans>
          </OutlinedButton>
        </div>
      ) : (
        <ContainedButton onClick={setupAccount}>
          <Trans>set up account</Trans>
        </ContainedButton>
      )}
    </div>
  );
};
export { SellerSetupAccount };
