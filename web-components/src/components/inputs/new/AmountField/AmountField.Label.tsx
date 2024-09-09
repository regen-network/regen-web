import { Grid } from '@mui/material';

import { AuxiliaryLabel } from './AmountField.AuxiliaryLabel';
import { useAmountFieldStyles } from './AmountField.styles';
import { AmountLabelProps } from './AmountField.types';

export const AmountLabel: React.FC<React.PropsWithChildren<AmountLabelProps>> =
  ({ label, auxiliaryLabel, availableAmount, availableLabel, denom }) => {
    const { classes: styles } = useAmountFieldStyles();
    return (
      <Grid container justifyContent="space-between">
        <span className={styles.mainLabel}>{label}</span>
        <AuxiliaryLabel
          availableLabel={availableLabel}
          availableAmount={availableAmount}
          auxiliaryLabel={auxiliaryLabel}
          denom={denom}
          className={styles.auxiliarLabelDesktop}
        />
      </Grid>
    );
  };
