import { Trans } from '@lingui/macro';

import { Body, Title } from 'web-components/src/components/typography';

export const CreditCardHidden = () => (
  <div className="mb-20 bg-orange-gradient p-20 pl-[12px] rounded-[10px] border-solid border border-l-8 border-bc-orange-300">
    <Title variant="h2" className="text-base">
      <Trans>Credit card orders are hidden</Trans>
    </Title>
    <Body size="sm" mobileSize="sm">
      <Trans>
        This feature is not yet supported by Wallet Connect and Keplr mobile.
        Please log in using Keplr browser extension on desktop or via email or
        Google login.
      </Trans>
    </Body>
  </div>
);
