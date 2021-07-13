import React from 'react';
import cx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

import { Label } from '../atoms';

const useStyles = makeStyles(theme => ({
  root: {
    '& > div': {
      padding: theme.spacing(3, 0),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2, 0),
      },
      '&:first-of-type': {
        paddingTop: 0,
      },
      '&:last-of-type': {
        paddingBottom: 0,
      },
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  disclaimerTop: {
    color: theme.palette.info.dark,
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  timespan: {
    color: theme.palette.secondary.main,
    letterSpacing: '1px',
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  description: {
    fontSize: theme.typography.pxToRem(22),
    lineHeight: theme.typography.pxToRem(33),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(27),
    },
  },
  disclaimerBottom: {
    fontSize: theme.typography.pxToRem(12),
    paddingTop: theme.spacing(2),
    color: theme.palette.info.dark,
  },
}));

const ReviewProcessInfo: React.FC<{
  className?: string;
  title: string;
  description: string;
  disclaimerTop?: string;
  disclaimerBottom?: string;
  btnText?: string;
  onBtnClick?: () => void;
  timespan?: string;
}> = props => {
  const styles = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      className={cx(styles.root, props.className)}
    >
      {props.disclaimerTop && (
        <div>
          <Typography className={styles.disclaimerTop}>{ReactHtmlParser(props.disclaimerTop)}</Typography>
        </div>
      )}
      <div>
        <Title variant="h2" align="center" className={styles.title}>
          {ReactHtmlParser(props.title)}
        </Title>
      </div>
      {props.timespan && (
        <div>
          <Label className={styles.timespan}>{props.timespan}</Label>
        </div>
      )}
      <div>
        <Description className={styles.description} align="center">
          {ReactHtmlParser(props.description)}
        </Description>
      </div>
      {props.btnText && props.onBtnClick && (
        <div>
          <ContainedButton onClick={props.onBtnClick}>{ReactHtmlParser(props.btnText)}</ContainedButton>
        </div>
      )}
      {props.disclaimerBottom && (
        <div>
          <Typography className={styles.disclaimerBottom}>{props.disclaimerBottom}</Typography>
        </div>
      )}
    </Box>
  );
};

export { ReviewProcessInfo };
