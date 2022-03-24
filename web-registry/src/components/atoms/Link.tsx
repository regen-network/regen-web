import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { SxProps } from '@mui/system';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { LinkItem } from 'web-components/lib/components/footer/footer-new';

interface LinkProps extends LinkItem {
  className?: string;
  sx?: SxProps<Theme>;
}

/**
 * @returns a Material UI `Link` - will use React Router for local links
 */
export const Link: React.FC<LinkProps> = ({
  href,
  children,
  target,
  className,
  sx,
}) => {
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
