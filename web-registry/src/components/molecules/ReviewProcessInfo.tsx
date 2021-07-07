import React from 'react';
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
      padding: theme.spacing(3.75, 0),
      '&:first-of-type': {
        paddingTop: 0,
      },
      '&:last-of-type': {
        paddingBottom: 0,
      },
    },
  },
  disclaimerTop: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.info.dark,
    fontWeight: 700,
  },
  timespan: {
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(18),
  },
  description: {
    fontSize: theme.typography.pxToRem(22),
    lineHeight: theme.typography.pxToRem(33),
  },
  disclaimerBottom: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.info.dark,
  },
}));

const ReviewProcessInfo: React.FC<{
  title: string;
  description: string;
  disclaimerTop?: string;
  disclaimerBottom?: string;
  btnText?: string;
  href?: string;
  timespan?: string;
}> = props => {
  const styles = useStyles();
  return (
    <Box display="flex" alignItems="center" flexDirection="column" className={styles.root}>
      {props.disclaimerTop && (
        <div>
          <Typography className={styles.disclaimerTop}>{ReactHtmlParser(props.disclaimerTop)}</Typography>
        </div>
      )}
      <div>
        <Title variant="h2">{ReactHtmlParser(props.title)}</Title>
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
      {props.btnText && props.href && (
        <div>
          <ContainedButton href={props.href}>{ReactHtmlParser(props.btnText)}</ContainedButton>
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
