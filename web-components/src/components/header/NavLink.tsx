import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Link from '@mui/material/Link';

export const useNavLinkStyles = makeStyles<Theme, { isActive: boolean }>(
  theme => ({
    navLink: props => ({
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
      fontWeight: 400,
      fontSize: theme.typography.pxToRem(18),
      lineHeight: '150%', // mockups show 240%, but that messes up the underline
      cursor: 'pointer',
      borderBottom: `2px solid ${
        props.isActive ? theme.palette.secondary.main : 'transparent'
      }`,
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    }),
  }),
);

export type NavLinkProps = {
  href: string;
  /** replaces default styles with passed styles */
  overrideClassname?: string;
};

export const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  overrideClassname,
}) => {
  const pathname = window && window.location && window.location.pathname;
  const styles = useNavLinkStyles({ isActive: pathname === href });

  return (
    <Link className={overrideClassname ?? styles.navLink} href={href}>
      {children}
    </Link>
  );
};
