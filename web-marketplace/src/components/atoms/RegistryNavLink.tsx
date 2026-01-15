import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  NavLinkProps,
  useNavLinkStyles,
} from 'web-components/src/components/header/components/NavLink';
import { cn } from 'web-components/src/utils/styles/cn';

import { ReactRouterMuiLink as Link } from './Link';

/**
 * Renders a registry `Link` with the navlink styles applied.
 */
export const RegistryNavLink: React.FC<React.PropsWithChildren<NavLinkProps>> =
  ({ children, href, overrideClassname, className, disabled }) => {
    const { pathname } = useLocation();
    const isActive = pathname === href;
    const { classes } = useNavLinkStyles({ isActive: !!isActive, disabled });

    const handleDisabledButtonClick = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
      e.preventDefault();
    };

    return (
      <Link
        href={href}
        className={overrideClassname ?? cn(classes.navLink, className)}
        {...(disabled ? { onClick: handleDisabledButtonClick } : {})}
      >
        {children}
      </Link>
    );
  };
