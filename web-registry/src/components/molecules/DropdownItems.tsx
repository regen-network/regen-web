import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import Title from 'web-components/lib/components/title';
import { PeerReviewed } from '../atoms';

type CreditProps = {
  title: string;
  href: string;
  methodology: string;
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isPeerReviewed?: boolean;
};

type MethodologyProps = {
  title: string;
  href: string;
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isPeerReviewed?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    margin: theme.spacing(0, 3),
  },
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
  },
  creditClassTitle: {
    fontSize: '14px',
    letterSpacing: '1px',
    fontWeight: 800,
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
  },
}));

/**
 * Custom dropdown item for registry nav Credit Classes
 */
const CreditClassDropdownItem: React.FC<CreditProps> = ({ svg: SVG, isPeerReviewed = false, ...props }) => {
  const styles = useStyles();

  return (
    <div>
      <Title variant="h4" className={styles.creditClassTitle}>
        {ReactHtmlParser(props.title)}
      </Title>
      <MethodologyDropdownItem
        title={props.methodology}
        svg={SVG}
        href={props.href}
        isPeerReviewed={isPeerReviewed}
      />
    </div>
  );
};

/**
 * Custom dropdown item for registry nav Methodologies
 */
const MethodologyDropdownItem: React.FC<MethodologyProps> = ({
  svg: SVG,
  isPeerReviewed = false,
  ...props
}) => {
  const styles = useStyles();

  return (
    <Grid container wrap="nowrap" justify="center" alignItems="center">
      <SVG />
      <span className={styles.label}>
        <Link href={props.href} className={styles.link}>
          {ReactHtmlParser(props.title)}
        </Link>
      </span>
      {isPeerReviewed && <PeerReviewed />}
    </Grid>
  );
};

export { CreditClassDropdownItem, MethodologyDropdownItem };
