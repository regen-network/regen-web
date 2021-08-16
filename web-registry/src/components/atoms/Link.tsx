import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';

/**
 * @returns a HTML Anchor for external links, react router for internal links
 */
export const Link: React.FC<{ href: string; className?: string }> = ({ href, children, className }) => {
  const isInternalLink = (href: string) => href.startsWith('/');

  return isInternalLink(href) ? (
    <MuiLink className={className} component={RouterLink} to={href}>
      {children}
    </MuiLink>
  ) : (
    <MuiLink className={className} href={href}>
      {children}
    </MuiLink>
  );
};
