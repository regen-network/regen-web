import React from 'react';
import { Box, Grid } from '@mui/material';
import { Field } from 'formik';
import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
import { getFormattedNumber } from '../../utils/format';
import TextField, { RegenTextFieldProps } from '../inputs/TextField';

const useStyles = makeStyles()((theme: Theme) => ({
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
    fontFamily: 'var(--font-muli)',
    fontSize: '12px',
    color: theme.palette.info.dark,
    marginRight: theme.spacing(1),
  },
  denom: {
    fontFamily: 'var(--font-muli)',
    fontSize: '12px',
    color: theme.palette.info.dark,
  },
}));

interface AuxiliarLabelProps {
  availableAmount: number;
  availableLabel: string;
  denom: string;
  auxiliarLabel?: string;
  className?: string;
}

interface AmountLabelProps {
  label?: string | JSX.Element;
  availableLabel: string;
  auxiliarLabel?: string;
  availableAmount: number;
  denom: string;
}

interface AmountFieldProps extends AmountLabelProps {
  name: string;
  auxiliarLabel?: string;
  maxLabel: string;
  availableLabel: string;
  className?: string;
}

const AuxiliarLabel: React.FC<React.PropsWithChildren<AuxiliarLabelProps>> = ({
  availableAmount,
  availableLabel,
  denom,
  auxiliarLabel,
  className,
}) => {
  const { classes: styles } = useStyles();
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
          <span className={styles.availableLabel}>{availableLabel}:</span>{' '}
          <span className={styles.availableAmount}>
            {getFormattedNumber(availableAmount)}
          </span>
          <span className={styles.denom}>{denom}</span>
        </span>
      </Box>
    </Box>
  );
};

const AmountLabel: React.FC<React.PropsWithChildren<AmountLabelProps>> = ({
  label,
  auxiliarLabel,
  availableAmount,
  availableLabel,
  denom,
}) => {
  const { classes: styles } = useStyles();
  return (
    <Grid container justifyContent="space-between">
      <span className={styles.mainLabel}>{label}</span>
      <AuxiliarLabel
        availableAmount={availableAmount}
        availableLabel={availableLabel}
        auxiliarLabel={auxiliarLabel}
        denom={denom}
        className={styles.auxiliarLabelDesktop}
      />
    </Grid>
  );
};

interface AmountTextFieldProps extends RegenTextFieldProps {
  availableAmount: number;
  maxLabel: string;
}

const AmountTextField: React.FC<React.PropsWithChildren<AmountTextFieldProps>> =
  ({ availableAmount, maxLabel, ...props }: AmountTextFieldProps) => {
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
            sx={(theme: Theme) => ({
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
            {maxLabel}
          </Grid>
        }
      />
    );
  };

const AmountField: React.FC<React.PropsWithChildren<AmountFieldProps>> = ({
  name,
  label,
  auxiliarLabel,
  availableAmount,
  maxLabel,
  availableLabel,
  denom,
  className,
}) => {
  const { classes: styles, cx } = useStyles();
  return (
    <>
      <Field
        name={name}
        type="number"
        component={AmountTextField}
        availableAmount={availableAmount}
        maxLabel={maxLabel}
        className={cx(styles.textField, className)}
        label={
          <AmountLabel
            label={label}
            availableLabel={availableLabel}
            auxiliarLabel={auxiliarLabel}
            availableAmount={availableAmount}
            denom={denom}
          />
        }
      />
      <AuxiliarLabel
        availableAmount={availableAmount}
        availableLabel={availableLabel}
        denom={denom}
        className={styles.auxiliarLabelMobile}
      />
    </>
  );
};

export default AmountField;
