import { Body } from 'web-components/lib/components/typography';

import { Link } from 'components/atoms';

type Props = {
  text: string;
  href: string;
};

export const BasketOverviewTooltip = ({ text, href }: Props): JSX.Element => (
  <Body>
    {text}{' '}
    <Link href={href} target="_blank">
      Learn more»
    </Link>
  </Body>
);
