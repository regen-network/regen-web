import { Box } from '@mui/material';

import { getFormattedNumber } from '../../../../utils/format';
import { useAmountFieldStyles } from './AmountField.styles';

interface AuxiliarLabelProps {
  availableAmount: number;
  denom: string;
  auxiliarLabel?: string;
  className?: string;
}

export const AuxiliarLabel: React.FC<
  React.PropsWithChildren<AuxiliarLabelProps>
> = ({ availableAmount, denom, auxiliarLabel, className }) => {
  const { classes: styles } = useAmountFieldStyles();
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
