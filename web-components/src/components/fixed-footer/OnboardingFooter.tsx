import React from 'react';
import { Theme } from '@material-ui/core';
import { withStyles, createStyles, makeStyles, useTheme } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box/Box';
import clsx from 'clsx';

import FixedFooter from './';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import OutlinedButton from '../buttons/OutlinedButton';
import ContainedButton from '../buttons/ContainedButton';

const StyledLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: theme.spacing(2),
      borderRadius: 2,
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
  percentComplete: number; // TODO: we should probably use a helper function to calculate this, or it would be hard to manage. One idea is to have an array with all routes which contain steps, and use the order of a route in that array to determine the percentage of overall completion, but that would depend on each step living in its own route
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '50%',
    marginBottom: theme.spacing(2), // same as height of progress bar
  },
  back: {
    marginRight: theme.spacing(4),
    // [theme.breakpoints.up('sm')]: {
    //   maxHeight: theme.spacing(12),
    // },
    // [theme.breakpoints.down('xs')]: {
    //   maxHeight: theme.spacing(9),
    // },
  },
  btn: {
    padding: theme.spacing(0, 4),
  },
}));

const OnboardingFooter: React.FC<Props> = ({ saveText = 'Save & Next', ...p }) => {
  const classes = useStyles({});
  const theme: Theme = useTheme();

  return (
    <FixedFooter>
      <Grid container justify="space-between" className={classes.root}>
        <Box display="flex">
          <OutlinedButton className={clsx(classes.back, classes.btn)} onClick={p.onBack}>
            <ArrowDownIcon direction="prev" color={theme.palette.secondary.main} />
          </OutlinedButton>
          <OutlinedButton className={classes.btn} onClick={p.onSkip}>
            <ArrowDownIcon direction="next" color={theme.palette.secondary.main} />
          </OutlinedButton>
        </Box>
        <Box flexGrow={1} />
        <ContainedButton className={classes.btn} onClick={p.onSave}>
          {saveText}
        </ContainedButton>
      </Grid>
      <StyledLinearProgress variant="determinate" value={p.percentComplete} />
    </FixedFooter>
  );
};

export default OnboardingFooter;
