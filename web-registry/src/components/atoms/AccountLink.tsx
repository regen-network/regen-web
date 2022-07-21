import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { truncate } from 'web-components/lib/utils/truncate';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';

import { getAccountUrl } from '../../lib/block-explorer';

interface AccountLinkProps extends MuiLinkProps {
  address: string;
  children?: ReactNode;
  /** optionally display arrow icon, for accounts using `LinkWithArrow` component */
  withArrow?: boolean;
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
  withArrow = false,
  ...linkProps
}: AccountLinkProps): JSX.Element => {
  const isRegen = address.startsWith('regen');
  const content = !!children ? children : truncate(address);
  if (!isRegen) {
    return (
      <MuiLink
        {...linkProps}
        href={getAccountUrl(address)}
        target={linkProps.target || '_blank'}
        rel="noopener noreferrer"
      >
        <Children withArrow={withArrow}>{content}</Children>
      </MuiLink>
    );
  }
  return (
    <MuiLink
      {...linkProps}
      component={RouterLink}
      to={`/ecocredits/accounts/${address}`}
    >
      <Children withArrow={withArrow}>{content}</Children>
    </MuiLink>
  );
};

const Children = ({
  children,
  withArrow = false,
}: {
  children: ReactNode;
  withArrow?: boolean;
}): JSX.Element => (
  <>
    {children}
    {withArrow && (
      <SmallArrowIcon sx={{ ml: 2, mb: 0.3, height: 9, width: 13 }} />
    )}
  </>
);
