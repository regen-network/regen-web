import React from 'react';

import {
  NavLinkProps,
  useNavLinkStyles,
} from 'web-components/src/components/header/components/NavLink';

import { Link } from './Link';

/**
 * @returns a registry `Link` with the navlink styles applied.
 */
export const RegistryNavLink: React.FC<React.PropsWithChildren<NavLinkProps>> =
  ({ children, href, overrideClassname }) => {
    const isActive =
      window && window.location && window.location.pathname === href;
    const { classes } = useNavLinkStyles({ isActive: !!isActive });

    return (
      <Link href={href} className={overrideClassname ?? classes.navLink}>
        {children}
      </Link>
    );
  };
