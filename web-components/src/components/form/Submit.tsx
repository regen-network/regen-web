import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { CancelButtonFooter } from '../organisms/CancelButtonFooter/CancelButtonFooter';

interface SubmitProps {
  submitCount: number;
  isValid: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  submitForm?: () => void;
  status?: {
    serverError: string;
  };
  label: string;
  errorText: string;
}

const useStyles = makeStyles()(theme => ({
  button: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

export default function Submit({
  isSubmitting,
  onClose,
  status,
  isValid,
  submitCount,
  submitForm = () => void 0,
  label,
  errorText,
}: SubmitProps): JSX.Element {
  const { classes } = useStyles();
  return (
    <Box sx={{ pt: 12.5 }}>
      <CancelButtonFooter
        onCancel={() => {
          if (!isSubmitting) {
            onClose();
          }
        }}
        label={label}
        className={classes.button}
        disabled={(submitCount > 0 && !isValid) || isSubmitting}
        onClick={submitForm}
        type="submit"
      ></CancelButtonFooter>
      {submitCount > 0 && !isValid && (
        <Box className={classes.error}>{errorText}</Box>
      )}
      {status && status.serverError && (
        <Box className={classes.error}>{status.serverError}</Box>
      )}
    </Box>
  );
}
