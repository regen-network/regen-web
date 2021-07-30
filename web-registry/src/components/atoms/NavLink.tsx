import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { NavLink as DefaultLink, useNavLinkStyles } from 'web-components/lib/components/header/NavLink';

/**
 * @returns a HTML Anchor for external links, react router for internal links for use in Registry app (not web-www)
 */
export const NavLink: React.FC<{ to: string }> = ({ to, children }) => {
  const isActive = window && window.location && window.location.pathname === to;
  const styles = useNavLinkStyles({ isActive: !!isActive });

  // TODO: ideally we would use a routerLink here, but it's not working with the gatsby setup
  const isInternalLink = (href: string) => href.startsWith('/');
  return isInternalLink(to) ? (
    <Link className={styles.navLink} component={RouterLink} to={to}>
      {children}
    </Link>
  ) : (
    <DefaultLink href={to}>{children}</DefaultLink>
  );
};
