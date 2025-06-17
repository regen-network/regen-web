import { Trans } from '@lingui/react/macro';

import { Body } from 'web-components/src/components/typography';

import { Link } from 'components/atoms';

type Props = {
  text: string;
  href: string;
};

export const BasketOverviewTooltip = ({ text, href }: Props): JSX.Element => (
  <Body>
    {text}{' '}
    <Link href={href} target="_blank">
      <Trans>Learn more»</Trans>
    </Link>
  </Body>
);
