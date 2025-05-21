import { Trans } from '@lingui/macro';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';

import { useAuth } from 'lib/auth/auth';

import { useStripeAccount } from './hooks/useStripeAccount';

const SellerSetupAccount = () => {
  const { activeAccount } = useAuth();
  const { setupAccount, openLoginLink } = useStripeAccount();

  return (
    <div className="bg-grey-100 h-[150px]">
      {activeAccount?.stripeConnectedAccountId ? (
        <ContainedButton onClick={openLoginLink}>
          <Trans>view transactions</Trans>
        </ContainedButton>
      ) : (
        <ContainedButton onClick={setupAccount}>
          <Trans>set up account</Trans>
        </ContainedButton>
      )}
    </div>
  );
};
export { SellerSetupAccount };
