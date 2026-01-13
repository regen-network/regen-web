import { usePathname } from 'next/navigation';

import {
  NavLinkProps,
  useNavLinkStyles,
} from 'web-components/src/components/header/components/NavLink';
import { cn } from 'web-components/src/utils/styles/cn';

import { useCurrentLocale } from 'lib/i18n/hooks/useCurrentLocale';
import { ensureLocalePrefix } from 'lib/i18n/utils/ensureLocalePrefix';

import { normalizePath, PROFILES_PATH } from './HeaderNavLink.utils';
import { Link } from './Link';

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
  const locale = useCurrentLocale();
  const hrefWithLocale = ensureLocalePrefix(href, locale);
  const normalizedPathname = normalizePath(pathname);
  const normalizedHref = normalizePath(hrefWithLocale);
  const isProfileLink = normalizedHref.includes(PROFILES_PATH);
  const isActive =
    normalizedPathname === normalizedHref ||
    (isProfileLink && normalizedPathname.startsWith(`${normalizedHref}/`));
  const { classes } = useNavLinkStyles({ isActive, disabled });

  const handleDisabledButtonClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  /**
   * All routes are now using React Router, so we can use the Link component
   * for client-side navigation instead of forcing full page reloads.
   */

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
