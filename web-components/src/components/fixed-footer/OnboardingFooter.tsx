import React from 'react';
import clsx from 'clsx';
import { Theme } from '@material-ui/core';
import { withStyles, createStyles, makeStyles, useTheme } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box/Box';

import FixedFooter from './';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import OutlinedButton from '../buttons/OutlinedButton';
import ContainedButton from '../buttons/ContainedButton';

const StyledLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(1.75),
      },
      [theme.breakpoints.down('xs')]: {
        height: theme.spacing(1.5),
      },
      borderRadius: theme.spacing(0, 2, 2, 0),
    },
    colorPrimary: {
      backgroundColor: theme.palette.info.light,
    },
    bar: {
      background: 'linear-gradient(81.77deg, rgba(79, 181, 115, 0.7) 0%, rgba(35, 142, 73, 0.7) 73.42%);',
    },
  }),
)(LinearProgress);

interface Props {
  onBack?: () => void;
  onSkip?: () => void;
  onSave: () => void;
  saveText?: string;
  // TODO: we should probably use a helper function to calculate this, or it would
  // be hard to manage. One idea is to have an array with all routes which contain
  // steps, and use the order of a route in that array to determine the percentage
  // of overall completion, but that would depend on each step living in its own
  // route
  percentComplete: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2), // same as height of progress bar
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
    },
  },
  arrows: {
    marginRight: theme.spacing(8),
  },
  btn: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 4),
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 4),
      fontSize: theme.spacing(3),
    },
  },
  back: {
    marginRight: theme.spacing(4),
  },
}));

const OnboardingFooter: React.FC<Props> = ({ saveText = 'Save & Next', ...p }) => {
  const classes = useStyles({});
  const theme: Theme = useTheme();

  return (
    <FixedFooter>
      <Grid container spacing={4} className={classes.root}>
        <Grid item className={classes.arrows}>
          {p.onBack && (
            <OutlinedButton className={clsx(classes.btn, classes.back)} onClick={p.onBack}>
              <ArrowDownIcon fontSize="small" direction="prev" color={theme.palette.secondary.main} />
            </OutlinedButton>
          )}
          {p.onSkip && (
            <OutlinedButton className={classes.btn} onClick={p.onSkip}>
              <ArrowDownIcon fontSize="small" direction="next" color={theme.palette.secondary.main} />
            </OutlinedButton>
          )}
        </Grid>
        {/* <Box display="flex" className={classes.arrows}></Box> */}
        <Grid item>
          <ContainedButton className={classes.btn} onClick={p.onSave}>
            {saveText}
          </ContainedButton>
        </Grid>
      </Grid>
      <StyledLinearProgress variant="determinate" value={p.percentComplete} />
    </FixedFooter>
  );
};

export default OnboardingFooter;
