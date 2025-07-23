import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavLinkProps,
  useNavLinkStyles,
} from 'web-components/src/components/header/components/NavLink';
import { cn } from 'web-components/src/utils/styles/cn';

/**
 * Renders a header `Link` with the navlink styles applied.
 */
export const HeaderNavLink: React.FC<React.PropsWithChildren<NavLinkProps>> = ({
  children,
  href,
  overrideClassname,
  className,
  disabled,
}) => {
  const pathname = usePathname();
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
