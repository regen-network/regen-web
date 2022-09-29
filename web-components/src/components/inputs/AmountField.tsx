import React from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Field } from 'formik';

import { Theme } from '../../theme/muiTheme';
import { getFormattedNumber } from '../../utils/format';
import TextField, { RegenTextFieldProps } from '../inputs/TextField';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiInputBase-root': {
      paddingRight: '0 !important',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  mainLabel: {
    marginRight: theme.spacing(8),
  },
  auxiliarLabelDesktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  auxiliarLabelMobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  availableLabel: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: theme.palette.info.dark,
  },
  availableAmount: {
    fontFamily: 'Muli',
    fontSize: '12px',
    color: theme.palette.info.dark,
    marginRight: theme.spacing(1),
  },
  denom: {
    fontFamily: 'Muli',
    fontSize: '12px',
    color: theme.palette.info.dark,
  },
}));

interface AuxiliarLabelProps {
  availableAmount: number;
  denom: string;
  auxiliarLabel?: string;
  className?: string;
}

interface AmountLabelProps {
  label?: string | JSX.Element;
  auxiliarLabel?: string;
  availableAmount: number;
  denom: string;
}

interface AmountFieldProps extends AmountLabelProps {
  name: string;
  auxiliarLabel?: string;
  className?: string;
}

const AuxiliarLabel: React.FC<AuxiliarLabelProps> = ({
  availableAmount,
  denom,
  auxiliarLabel,
  className,
}) => {
  const styles = useStyles();
  return (
    <Box className={className} component="span" sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: auxiliarLabel ? 'space-between' : 'flex-end',
        }}
      >
        {auxiliarLabel && (
          <span className={styles.availableLabel}>{auxiliarLabel}</span>
        )}
        <span>
          <span className={styles.availableLabel}>Available:</span>{' '}
          <span className={styles.availableAmount}>
            {getFormattedNumber(availableAmount)}
          </span>
          <span className={styles.denom}>{denom}</span>
        </span>
      </Box>
    </Box>
  );
};

const AmountLabel: React.FC<AmountLabelProps> = ({
  label,
  auxiliarLabel,
  availableAmount,
  denom,
}) => {
  const styles = useStyles();
  return (
    <Grid container justifyContent="space-between">
      <span className={styles.mainLabel}>{label}</span>
      <AuxiliarLabel
        availableAmount={availableAmount}
        auxiliarLabel={auxiliarLabel}
        denom={denom}
        className={styles.auxiliarLabelDesktop}
      />
    </Grid>
  );
};

interface AmountTextFieldProps extends RegenTextFieldProps {
  availableAmount: number;
}

const AmountTextField: React.FC<AmountTextFieldProps> = ({
  availableAmount,
  ...props
}: AmountTextFieldProps) => {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;
  return (
    <TextField
      {...props}
      endAdornment={
        <Grid
          container
          alignItems="center"
          sx={theme => ({
            fontFamily: theme.typography.h1.fontFamily,
            color: theme.palette.info.dark,
            textTransform: 'uppercase',
            fontWeight: 800,
            letterSpacing: '1px',
            backgroundColor: theme.palette.grey[100],
            fontSize: theme.spacing(3),
            cursor: 'pointer',
            px: 5,
            height: {
              xs: theme.spacing(12.5),
              sm: theme.spacing(15),
            },
          })}
          onClick={() => setFieldValue(name, availableAmount)}
        >
          max
        </Grid>
      }
    />
  );
};

const AmountField: React.FC<AmountFieldProps> = ({
  name,
  label = 'Amount',
  auxiliarLabel,
  availableAmount,
  denom,
  className,
}) => {
  const styles = useStyles();
  return (
    <>
      <Field
        name={name}
        type="number"
        component={AmountTextField}
        availableAmount={availableAmount}
        className={clsx(styles.textField, className)}
        label={
          <AmountLabel
            label={label}
            auxiliarLabel={auxiliarLabel}
            availableAmount={availableAmount}
            denom={denom}
          />
        }
      />
      <AuxiliarLabel
        availableAmount={availableAmount}
        denom={denom}
        className={styles.auxiliarLabelMobile}
      />
    </>
  );
};

export default AmountField;
