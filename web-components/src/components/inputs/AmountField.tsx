import React from 'react';
import { Field } from 'formik';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import clsx from 'clsx';

import { Theme } from '../../theme/muiTheme';
import TextField from '../inputs/TextField';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
    '& .MuiInputBase-formControl': {
      marginTop: theme.spacing(2.25),
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
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  batchDenom: {
    fontFamily: 'Muli',
    fontSize: '12px',
    color: theme.palette.info.dark,
  },
}));

interface AuxiliarLabelProps {
  availableAmount: number;
  batchDenom: string;
  className?: string;
}

interface AmountLabelProps {
  label?: string;
  availableAmount: number;
  batchDenom: string;
}

interface AmountFieldProps extends AmountLabelProps {
  name: string;
  className?: string;
}

const AuxiliarLabel: React.FC<AuxiliarLabelProps> = ({
  availableAmount,
  batchDenom,
  className,
}) => {
  const styles = useStyles();
  return (
    <span className={className}>
      <span className={styles.availableLabel}>Available:</span>{' '}
      <span className={styles.availableAmount}>{availableAmount}</span>
      <span className={styles.batchDenom}>{batchDenom}</span>
    </span>
  );
};

const AmountLabel: React.FC<AmountLabelProps> = ({
  label,
  availableAmount,
  batchDenom,
}) => {
  const styles = useStyles();
  return (
    <Grid container justifyContent="space-between">
      <span className={styles.mainLabel}>{label}</span>
      <AuxiliarLabel
        availableAmount={availableAmount}
        batchDenom={batchDenom}
        className={styles.auxiliarLabelDesktop}
      />
    </Grid>
  );
};

const AmountField: React.FC<AmountFieldProps> = ({
  name,
  label = 'Amount',
  availableAmount,
  batchDenom,
  className,
}) => {
  const styles = useStyles();
  return (
    <>
      <Field
        name={name}
        type="number"
        component={TextField}
        className={clsx(styles.textField, className)}
        label={
          <AmountLabel
            label={label}
            availableAmount={availableAmount}
            batchDenom={batchDenom}
          />
        }
      />
      <AuxiliarLabel
        availableAmount={availableAmount}
        batchDenom={batchDenom}
        className={styles.auxiliarLabelMobile}
      />
    </>
  );
};

export default AmountField;
