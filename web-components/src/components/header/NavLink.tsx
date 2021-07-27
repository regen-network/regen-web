import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles<Theme, { isActive: boolean }>(theme => ({
  root: props => ({
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(18),
    lineHeight: '150%', // mockups show 240%, but that messes up the underline
    cursor: 'pointer',
    borderBottom: `2px solid ${props.isActive ? theme.palette.secondary.main : 'transparent'}`,
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
  }),
}));

/**
 * @returns a HTML Anchor for external links, react router for internal links
 */
export const NavLink: React.FC<{ to: string }> = ({ to, children }) => {
  const isActive = window && window.location && window.location.pathname === to;
  const styles = useStyles({ isActive: !!isActive });

  // TODO: ideally we would use a routerLink here, but it's not working with the gatsby setup
  // const isInternalLink = (href: string) => href.startsWith('/');
  // return isInternalLink(to) ? (
  //   <Link className={styles.root} component={RouterLink} to={to}>
  //     {children}
  //   </Link>
  // ) : (
  return (
    <Link className={styles.root} href={to}>
      {children}
    </Link>
  );
};
