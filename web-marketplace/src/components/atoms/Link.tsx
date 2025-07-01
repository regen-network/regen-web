import React, { forwardRef, PropsWithChildren } from 'react';
import { Box, Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends MuiLinkProps, PropsWithChildren {
  href: string;
}

type LinkRef = HTMLAnchorElement;
type CombinedLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
> &
  NextLinkProps;

const LinkBehavior = React.forwardRef<LinkRef, CombinedLinkProps>(
  (props, ref) => {
    const { href, as, ...other } = props;
    return <NextLink ref={ref} href={href} as={as} {...other} />;
  },
);

// eslint-disable-next-line lingui/no-unlocalized-strings
LinkBehavior.displayName = 'LinkBehavior';

/**
 * Renders a Material UI `Link` - will use Next Link for local links.
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
    // const hasAnchor = href?.includes('#');

    return isInternalLink(href) ? (
      <MuiLink {...linkProps} ref={ref} component={LinkBehavior} href={href}>
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
