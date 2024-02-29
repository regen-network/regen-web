import React from 'react';

import {
  NavLinkProps,
  useNavLinkStyles,
} from 'web-components/src/components/header/components/NavLink';

import { Link } from './Link';
import { cn } from 'web-components/src/utils/styles/cn';

/**
 * @returns a registry `Link` with the navlink styles applied.
 */
export const RegistryNavLink: React.FC<React.PropsWithChildren<NavLinkProps>> =
  ({ children, href, overrideClassname, className }) => {
    const isActive =
      window && window.location && window.location.pathname === href;
    const { classes } = useNavLinkStyles({ isActive: !!isActive });

    return (
      <Link
        href={href}
        className={overrideClassname ?? cn(classes.navLink, className)}
      >
        {children}
      </Link>
    );
  };
