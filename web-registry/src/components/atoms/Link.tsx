import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Box, Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

interface LinkProps extends MuiLinkProps {
  href: string; // require href
}

/**
 * @returns a Material UI `Link` - will use React Router for local links.
 * Defaults to `target='_blank'` for external links.
 */
export const Link: React.FC<LinkProps> = ({
  href,
  children,
  target,
  ...linkProps
}) => {
  if (!href) return <Box {...linkProps}>{children}</Box>;

  const isInternalLink = (href: string): boolean =>
    !!href && href.startsWith('/');
  const hasAnchor = href?.includes('#');

  return isInternalLink(href) ? (
    <MuiLink
      {...linkProps}
      component={hasAnchor ? HashLink : RouterLink}
      to={href}
    >
      {children}
    </MuiLink>
  ) : (
    <MuiLink {...linkProps} href={href} target={target || '_blank'}>
      {children}
    </MuiLink>
  );
};
