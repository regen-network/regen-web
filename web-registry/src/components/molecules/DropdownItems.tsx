import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { PeerReviewed } from '../atoms';

type CreditProps = {
  title: string;
  methodology: string;
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isPeerReviewed?: boolean;
};

type MethodologyProps = {
  title: string;
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isPeerReviewed?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    margin: theme.spacing(0, 3),
  },
  creditClassTitle: {
    fontFamily: theme.typography.h1.fontFamily,
    fontSize: '14px',
    lineHeight: '17.57px',
    letterSpacing: '1px',
    fontWeight: 800,
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
  },
}));

/**
 * Custom dropdown item for registry nav Credit Classes
 */
const CreditClassDropdownItem: React.FC<CreditProps> = ({ svg: SVG, isPeerReviewed = false, ...props }) => {
  const styles = useStyles();

  return (
    <>
      <h4 className={styles.creditClassTitle}>{ReactHtmlParser(props.title)}</h4>
      <MethodologyDropdownItem title={props.methodology} svg={SVG} isPeerReviewed={isPeerReviewed} />
    </>
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
      <span className={styles.label}>{ReactHtmlParser(props.title)}</span>
      {isPeerReviewed && <PeerReviewed />}
    </Grid>
  );
};

export { CreditClassDropdownItem, MethodologyDropdownItem };
