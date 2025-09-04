import { ReactNode } from 'react';

import { truncate } from 'web-components/src/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';
import { LINK_PREFIX } from 'lib/env';

import type { LinkProps } from './Link';
import { Link } from './Link';

interface AccountLinkProps extends Omit<LinkProps, 'href'> {
  address: string;
  children?: ReactNode;
}

/** Takes an address and returns a link to either the ecocredits account page, or
 * appropriate block explorer.
 *
 * Renders a `ReactRouterLink` for - Regen accounts, `MuiLink` for other addresses
 *
 * `children` are optional. If not passed, the address is truncated.
 */
export const AccountLink = ({
  address,
  children,
  ...linkProps
}: AccountLinkProps): JSX.Element => {
  const isRegen = address?.startsWith('regen') ?? false;
  const content = !!children ? children : truncate(address);
  if (!isRegen) {
    return (
      <Link
        {...linkProps}
        href={getAccountUrl(address)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </Link>
    );
  }
  const href = `${LINK_PREFIX}/profiles/${address}/portfolio`;
  return (
    <Link {...linkProps} href={href}>
      {content}
    </Link>
  );
};
