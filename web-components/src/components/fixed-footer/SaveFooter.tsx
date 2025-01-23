import React from 'react';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles, withStyles } from 'tss-react/mui';

import { TextButton } from '../buttons/TextButton';
import { PrevNextButtons } from '../molecules/PrevNextButtons/PrevNextButtons';
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
  saveExitText?: string;
  hideProgress?: boolean;
  // TODO: we should probably use a helper function to calculate this, or it would
  // be hard to manage. One idea is to have an array with all routes which contain
  // steps, and use the order of a route in that array to determine the percentage
  // of overall completion, but that would depend on each step living in its own
  // route. Another would just be to pass total steps + current step
  percentComplete?: number;
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
}));

const SaveFooter: React.FC<React.PropsWithChildren<Props>> = ({
  saveText,
  saveExitText,
  hideProgress = false,
  saveAndExit,
  percentComplete,
  ...props
}) => {
  const { classes } = useStyles({ hideProgress });

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
          <PrevNextButtons
            saveDisabled={props.saveDisabled}
            saveText={saveText}
            onPrev={props.onPrev}
            onSave={props.onSave}
          />
        </Grid>
      </Grid>
      {!hideProgress && typeof percentComplete !== 'undefined' && (
        <StyledLinearProgress variant="determinate" value={percentComplete} />
      )}
    </FixedFooter>
  );
};

export default SaveFooter;
