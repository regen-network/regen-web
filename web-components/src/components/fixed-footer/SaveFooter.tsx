import React from 'react';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { Theme } from '@mui/material/styles';
import { makeStyles, withStyles } from 'tss-react/mui';

import { cn } from '../../utils/styles/cn';
import ContainedButton from '../buttons/ContainedButton';
import OutlinedButton from '../buttons/OutlinedButton';
import { TextButton } from '../buttons/TextButton';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import FixedFooter from './';

const StyledLinearProgress = withStyles(LinearProgress, theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(1.75),
    },
    [theme.breakpoints.down('sm')]: {
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
}));

interface Props {
  onPrev?: () => void;
  onSave?: () => void;
  saveDisabled: boolean;
  saveText: string;
  saveExitText: string;
  hideProgress?: boolean;
  // TODO: we should probably use a helper function to calculate this, or it would
  // be hard to manage. One idea is to have an array with all routes which contain
  // steps, and use the order of a route in that array to determine the percentage
  // of overall completion, but that would depend on each step living in its own
  // route. Another would just be to pass total steps + current step
  percentComplete: number;
  saveAndExit?: () => Promise<void>;
}

type StyleProps = { hideProgress: boolean };

const useStyles = makeStyles<StyleProps>()((theme, { hideProgress }) => ({
  root: {
    marginBottom: hideProgress ? 0 : theme.spacing(1),
  },
  arrows: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  btn: {
    padding: theme.spacing(2, 4),
    minWidth: 0,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      height: theme.spacing(11),
    },
  },
}));

const SaveFooter: React.FC<React.PropsWithChildren<Props>> = ({
  saveText,
  saveExitText,
  hideProgress = false,
  saveAndExit,
  ...props
}) => {
  const { classes } = useStyles({ hideProgress });
  const theme: Theme = useTheme();

  return (
    <FixedFooter>
      <Grid
        container
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          {saveAndExit && (
            <TextButton
              className="font-sans normal-case tracking-normal"
              textSize="sm"
              onClick={saveAndExit}
            >
              {saveExitText}
            </TextButton>
          )}
        </Grid>

        <Grid item className={classes.arrows}>
          {props.onPrev && (
            <OutlinedButton
              className={cn(classes.btn, 'mr-10 sm:mr-20')}
              onClick={props.onPrev}
            >
              <ArrowDownIcon
                fontSize="small"
                direction="prev"
                color={theme.palette.secondary.main}
              />
            </OutlinedButton>
          )}
          <ContainedButton
            type="submit"
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

export default SaveFooter;
