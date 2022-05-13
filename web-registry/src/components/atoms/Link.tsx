import React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps extends MuiLinkProps {
  href: string; // require href
}

/**
 * @returns a Material UI `Link` - will use React Router for local links
 */
export const Link: React.FC<LinkProps> = ({ href, children, ...linkProps }) => {
  const isInternalLink = (href: string): boolean =>
    !!href && href.startsWith('/');

  return isInternalLink(href) ? (
    <MuiLink {...linkProps} component={RouterLink} to={href}>
      {children}
    </MuiLink>
  ) : (
    <MuiLink {...linkProps} href={href}>
      {children}
    </MuiLink>
  );
};
