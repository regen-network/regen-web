import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(18),
    lineHeight: '240%',
    cursor: 'pointer',
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
  },
}));

/**
 * @returns a MUI HTML Anchor for external links, react router for internal links
 */
export const NavLink: React.FC<{ to: string }> = ({ to, children }) => {
  const styles = useStyles();
  const isInternalLink = (href: string) => href.startsWith('/');
  return isInternalLink(to) ? (
    <Link className={styles.root} component={RouterLink} to={to}>
      {children}
    </Link>
  ) : (
    <Link className={styles.root} href={to}>
      {children}
    </Link>
  );
};
