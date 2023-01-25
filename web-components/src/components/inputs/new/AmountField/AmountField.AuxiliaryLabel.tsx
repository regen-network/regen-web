import { Box } from '@mui/material';

import { getFormattedNumber } from '../../../../utils/format';
import { useAmountFieldStyles } from './AmountField.styles';

interface AuxiliaryLabelProps {
  availableAmount: number;
  denom: string;
  auxiliaryLabel?: string;
  className?: string;
}

export const AuxiliaryLabel: React.FC<
  React.PropsWithChildren<AuxiliaryLabelProps>
> = ({ availableAmount, denom, auxiliaryLabel, className }) => {
  const { classes: styles } = useAmountFieldStyles();
  return (
    <Box className={className} component="span" sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: auxiliaryLabel ? 'space-between' : 'flex-end',
        }}
      >
        {auxiliaryLabel && (
          <span className={styles.availableLabel}>{auxiliaryLabel}</span>
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
