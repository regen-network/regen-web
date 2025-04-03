import React from 'react';
import Link from '@mui/material/Link';
import { makeStyles } from 'tss-react/mui';

import { cn } from '../../../utils/styles/cn';

type UseNavLinkStylesParams = {
  isActive: boolean;
  disabled?: boolean;
};

export const useNavLinkStyles = makeStyles<UseNavLinkStylesParams>()(
  (theme, { isActive, disabled }) => ({
    navLink: {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
      fontWeight: 400,
      fontSize: theme.typography.pxToRem(18),
      lineHeight: '150%', // mockups show 240%, but that messes up the underline
      cursor: 'pointer',
      borderBottom: `2px solid ${
        isActive ? theme.palette.secondary.main : 'transparent'
      }`,
      '&:hover': {
        borderBottom: `2px solid ${
          disabled ? 'transparent' : theme.palette.secondary.main
        }`,
      },
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  }),
);

export type NavLinkProps = {
  href: string;
  /** replaces default styles with passed styles */
  pathname: string;
  overrideClassname?: string;
  className?: string;
  disabled?: boolean;
  linkComponent?: React.ElementType;
};

export const NavLink: React.FC<React.PropsWithChildren<NavLinkProps>> = ({
  children,
  href,
  pathname,
  overrideClassname,
  className,
  linkComponent,
}) => {
  const { classes: styles } = useNavLinkStyles({ isActive: pathname === href });
  return (
    <Link
      {...(linkComponent ? { component: linkComponent } : {})}
      className={overrideClassname ?? cn(styles.navLink, className, 'yoo')}
      href={href}
    >
      {children}
    </Link>
  );
};
