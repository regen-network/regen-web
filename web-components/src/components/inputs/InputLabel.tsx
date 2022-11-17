import MuiInputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import { makeStyles } from 'tss-react/mui';

interface LabelProps extends InputLabelProps {
  optional?: boolean;
}

type UseStylesParams = {
  optional: boolean;
};

const useStyles = makeStyles<UseStylesParams>()((theme, { optional }) => ({
  root: {
    lineHeight: '140%',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    '&.Mui-error': {
      color: theme.palette.primary.contrastText,
    },
    '&::after': {
      content: !!optional ? '" (optional)"' : '""',
      fontWeight: 'normal',
      color: theme.palette.info.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
}));

export default function RegenInputLabel({
  optional = false,
  ...props
}: LabelProps): JSX.Element {
  const { classes } = useStyles({ optional });

  return (
    <MuiInputLabel {...props} classes={{ root: classes.root }}>
      {props.children}
    </MuiInputLabel>
  );
}
