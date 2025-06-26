import React, { forwardRef, PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Box, Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

interface LinkProps extends MuiLinkProps, PropsWithChildren {
  href: string;
}

/**
 * Renders a Material UI `Link` - will use React Router for local links.
 * Defaults to `target='_blank'` for external links.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, target, ...linkProps }, ref) => {
    if (!href || typeof href !== 'string') {
      // @ts-expect-error
      return <Box {...linkProps}>{children}</Box>;
    }

    const isInternalLink = (href: string): boolean =>
      !!href && href.startsWith('/');
    const hasAnchor = href?.includes('#');

    return isInternalLink(href) ? (
      <MuiLink
        {...linkProps}
        ref={ref}
        component={hasAnchor ? HashLink : RouterLink}
        to={href}
      >
        {children}
      </MuiLink>
    ) : (
      <MuiLink {...linkProps} ref={ref} href={href} target={target || '_blank'}>
        {children}
      </MuiLink>
    );
  },
);

// eslint-disable-next-line lingui/no-unlocalized-strings
Link.displayName = 'Link';
