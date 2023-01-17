import { Grid } from '@mui/material';

import { AuxiliarLabel } from './AmountField.AuxiliarLabel';
import { useAmountFieldStyles } from './AmountField.styles';
import { AmountLabelProps } from './AmountField.types';

export const AmountLabel: React.FC<React.PropsWithChildren<AmountLabelProps>> =
  ({ label, auxiliarLabel, availableAmount, denom }) => {
    const { classes: styles } = useAmountFieldStyles();
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
