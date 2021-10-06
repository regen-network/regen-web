import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Title from 'web-components/lib/components/title';
import { Image } from 'web-components/lib/components/image';

import { DualImageSection } from '../../generated/sanity-graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  amount: {
    textShadow: theme.shadows[4],
    lineHeight: '130%',
    color: theme.palette.primary.main,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(20),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(25),
    },
  },
  labelContainer: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2.5),
    },
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      '&:first-child': {
        padding: `${theme.spacing(34.25)} 0`,
      },
      padding: `${theme.spacing(30)} 0`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(60.5)} 0`,
    },
  },
  title: {
    fontWeight: 800,
    fontFamily: theme.typography.h1.fontFamily,
    letterSpacing: '1px',
    color: theme.palette.info.dark,
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(6.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(4.5),
    },
  },
  titleContainer: {
    position: 'absolute',
    background: theme.palette.primary.main,
    opacity: 0.8,
    zIndex: 1,
    borderRadius: '2px',
    boxShadow: theme.shadows[4],
    transform: 'translateX(-50%)',
    left: '50%',
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(11),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(5),
      padding: `${theme.spacing(3.5)} ${theme.spacing(3)}`,
      width: '95%',
    },
  },
  label: {
    fontSize: theme.spacing(4.5),
    color: theme.palette.primary.main,
    lineHeight: theme.spacing(5.75),
    fontWeight: 800,
    fontFamily: theme.typography.h1.fontFamily,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '2px',
    padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
  },
}));

interface Props {
  content: DualImageSection;
}

const TwoImageSection: React.FC<Props> = ({ content }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <div className={classes.titleContainer}>
        <Title variant="h5" className={classes.title}>
          {content?.title}
        </Title>
      </div>
      <Grid item xs={12} sm={6}>
        <Image backgroundImage src={content?.left?.image?.image?.asset?.url || ''}>
          <div className={classes.item}>
            <Title className={classes.amount}>{content?.left?.boldText}</Title>
            <div className={classes.labelContainer}>
              <span className={classes.label}>{content?.left?.label}</span>
            </div>
          </div>
        </Image>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Image backgroundImage src={content?.right?.image?.image?.asset?.url || ''}>
          <div className={classes.item}>
            <Title className={classes.amount}>{content?.right?.boldText}</Title>
            <div className={classes.labelContainer}>
              <span className={classes.label}>{content?.right?.label}</span>
            </div>
          </div>
        </Image>
      </Grid>
    </Grid>
  );
};

export { TwoImageSection };
