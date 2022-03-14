import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { SxProps } from '@mui/system';
import { Theme } from 'web-components/lib/theme/muiTheme';

/**
 * @returns a Material UI `Link` - will use React Router for local links
 */
export const Link: React.FC<{
  href: string;
  className?: string;
  sx?: SxProps<Theme>;
  target?: '_blank' | '_self';
}> = ({ href, children, target, className, sx }) => {
  const isInternalLink = (href: string): boolean =>
    !!href && href.startsWith('/');

  return isInternalLink(href) ? (
    <MuiLink
      sx={sx}
      className={className}
      component={RouterLink}
      to={href}
      target={target}
    >
      {children}
    </MuiLink>
  ) : (
    <MuiLink sx={sx} className={className} href={href} target={target}>
      {children}
    </MuiLink>
  );
};
