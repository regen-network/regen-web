import { ReactNode } from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

import { truncate } from 'web-components/src/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';
import { LINK_PREFIX } from 'lib/env';

import { Link } from './Link';

interface AccountLinkProps extends MuiLinkProps {
  address: string;
  children?: ReactNode;
}

/** Takes an address and returns a link to either the ecocredits account page, or
 * appropriate block explorer.
 *
 * @returns a `ReactRouterLink` for - Regen accounts, `MuiLink` for other addresses
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
      <MuiLink
        {...linkProps}
        href={getAccountUrl(address)}
        target={linkProps.target || '_blank'}
        rel="noopener noreferrer"
      >
        {content}
      </MuiLink>
    );
  }
  return (
    <Link {...linkProps} href={`${LINK_PREFIX}/profiles/${address}/portfolio`}>
      {content}
    </Link>
  );
};
