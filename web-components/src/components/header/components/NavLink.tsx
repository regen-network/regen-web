import React from 'react';
import Link from '@mui/material/Link';
import { makeStyles } from 'tss-react/mui';
import { DefaultTheme as Theme } from '@mui/styles';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useNavLinkStyles = makeStyles()(theme => ({
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
}));

export type NavLinkProps = {
  href: string;
  /** replaces default styles with passed styles */
  pathname: string;
  overrideClassname?: string;
};

export const NavLink: React.FC<React.PropsWithChildren<NavLinkProps>> = ({
  children,
  href,
  pathname,
  overrideClassname,
}) => {
  const { classes: styles } = useNavLinkStyles({ isActive: pathname === href });

  return (
    <Link className={overrideClassname ?? styles.navLink} href={href}>
      {children}
    </Link>
  );
};
