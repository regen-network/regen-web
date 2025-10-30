import type { ComponentPropsWithoutRef } from 'react';
import { Trans } from '@lingui/react/macro';

import { Body } from 'web-components/src/components/typography';

import { Link } from 'components/atoms/Link';

const WALLET_GUIDE_URL = 'https://guides.regen.network/guides/wallets';

type BodyProps = ComponentPropsWithoutRef<typeof Body>;
type LinkProps = ComponentPropsWithoutRef<typeof Link>;

export interface WalletGuideLearnMoreProps {
  bodyProps?: Omit<BodyProps, 'children'>;
  linkProps?: Omit<LinkProps, 'href' | 'children'>;
}

const WalletGuideLearnMore = ({
  bodyProps,
  linkProps,
}: WalletGuideLearnMoreProps): JSX.Element => (
  <Body pb={7.5} {...bodyProps}>
    <Trans>
      Learn more about wallets in our{' '}
      <Link {...linkProps} href={WALLET_GUIDE_URL}>
        user guide.
      </Link>
    </Trans>
  </Body>
);

export { WalletGuideLearnMore };
