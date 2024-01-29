import {
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  SxProps,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles, withStyles } from 'tss-react/mui';

import RegenStepIcon from './StepIcon';

interface StepperProps {
  className?: string;
  activeStep: number;
  background?: string;
  steps: string[];
  onStepClick?: (stepIndex: number) => void;
  sx?: SxProps<Theme>;
}

interface StyleProps {
  background?: string;
}

const useStyles = makeStyles<StyleProps>()((theme, { background }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.info.light,
    backgroundImage: `url(${background})`,
  },
  stepper: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: theme.spacing(3.75),
    maxWidth: theme.spacing(200),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3.5, 0),
    },
  },
  hover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  alternativeLabel: {
    '&.MuiStepLabel-label': {
      fontSize: theme.spacing(4),
      fontWeight: 700,
      color: theme.palette.info.dark,
      marginTop: theme.spacing(1),

      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3),
      },
    },
  },
}));

const RegenStepConnector = withStyles(
  StepConnector,
  (theme: Theme, _params, classes) => ({
    alternativeLabel: {
      [theme.breakpoints.up('sm')]: {
        top: theme.spacing(3.75),
        left: `calc(-50% + ${theme.spacing(3.75)})`,
        right: `calc(50% + ${theme.spacing(3.75)})`,
      },
      [theme.breakpoints.down('sm')]: {
        top: theme.spacing(2.75),
        left: `calc(-50% + ${theme.spacing(2.5)})`,
        right: `calc(50% + ${theme.spacing(2.5)})`,
      },
    },
    active: {
      [`& .${classes.line}`]: {
        borderColor: theme.palette.info.main,
      },
    },
    completed: {
      [`& .${classes.line}`]: {
        borderColor: theme.palette.info.main,
      },
    },
    line: {
      borderColor: theme.palette.info.main,
    },
  }),
);

const RegenStepper = ({
  className,
  activeStep,
  steps,
  background,
  onStepClick,
  sx,
}: StepperProps): JSX.Element => {
  const { classes, cx } = useStyles({ background });

  return (
    <div className={classes.root}>
      <Stepper
        sx={sx}
        className={cx(className, classes.stepper)}
        activeStep={activeStep}
        alternativeLabel
        connector={<RegenStepConnector />}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            onClick={onStepClick ? () => onStepClick(index) : () => {}}
          >
            <StepLabel
              classes={{
                alternativeLabel: cx(
                  classes.alternativeLabel,
                  onStepClick && classes.hover,
                ),
              }}
              StepIconComponent={RegenStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default RegenStepper;
