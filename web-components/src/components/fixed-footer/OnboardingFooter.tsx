import React from 'react';
import clsx from 'clsx';
import { Theme } from '@material-ui/core';
import {
  withStyles,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

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
      background:
        'linear-gradient(81.77deg, rgba(79, 181, 115, 0.7) 0%, rgba(35, 142, 73, 0.7) 73.42%);',
    },
  }),
)(LinearProgress);

interface Props {
  onPrev?: () => void;
  onNext?: () => void;
  onSave: () => void;
  saveDisabled: boolean;
  saveText?: string;
  hideProgress?: boolean;
  // TODO: we should probably use a helper function to calculate this, or it would
  // be hard to manage. One idea is to have an array with all routes which contain
  // steps, and use the order of a route in that array to determine the percentage
  // of overall completion, but that would depend on each step living in its own
  // route. Another would just be to pass total steps + current step
  percentComplete: number;
}

type StyleProps = { hideProgress: boolean };
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    marginBottom: props.hideProgress ? 0 : theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
    },
  }),
  arrows: {
    margin: theme.spacing(0, 2, 0, 0),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
    },
  },
  btn: {
    padding: theme.spacing(2, 4),
    minWidth: 0,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  back: {
    marginRight: theme.spacing(4),
  },
}));

const OnboardingFooter: React.FC<Props> = ({
  saveText = 'Save & Next',
  hideProgress = false,
  ...props
}) => {
  const classes = useStyles({ hideProgress });
  const theme: Theme = useTheme();

  return (
    <FixedFooter>
      <Grid container spacing={4} className={classes.root}>
        <Grid item className={classes.arrows}>
          {props.onPrev && (
            <OutlinedButton
              className={clsx(classes.btn, classes.back)}
              onClick={props.onPrev}
            >
              <ArrowDownIcon
                fontSize="small"
                direction="prev"
                color={theme.palette.secondary.main}
              />
            </OutlinedButton>
          )}
          {props.onNext && (
            <OutlinedButton className={classes.btn} onClick={props.onNext}>
              <ArrowDownIcon
                fontSize="small"
                direction="next"
                color={theme.palette.secondary.main}
              />
            </OutlinedButton>
          )}
        </Grid>
        <Grid item>
          <ContainedButton
            className={classes.btn}
            onClick={props.onSave}
            disabled={props.saveDisabled}
          >
            {saveText}
          </ContainedButton>
        </Grid>
      </Grid>
      {!hideProgress && (
        <StyledLinearProgress
          variant="determinate"
          value={props.percentComplete}
        />
      )}
    </FixedFooter>
  );
};

export default OnboardingFooter;
