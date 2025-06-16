import { Box } from '@mui/material';

import { getFormattedNumber } from '../../../../utils/format';
import { cn } from '../../../../utils/styles/cn';
import { useAmountFieldStyles } from './AmountField.styles';

interface AuxiliaryLabelProps {
  availableAmount: number;
  denom: string;
  auxiliaryLabel?: string;
  availableLabel: string;
  className?: string;
}

export const AuxiliaryLabel = ({
  availableAmount,
  denom,
  auxiliaryLabel,
  availableLabel,
  className,
}: AuxiliaryLabelProps): JSX.Element => {
  const { classes: styles } = useAmountFieldStyles();
  return (
    <Box className={className} component="div" sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: auxiliaryLabel ? 'space-between' : 'flex-end',
        }}
      >
        {auxiliaryLabel && (
          <span className={styles.availableLabel}>{auxiliaryLabel}</span>
        )}
        {!isNaN(availableAmount) && (
          <p className={cn('m-0 block', styles.availableLabel)}>
            {availableLabel}:
            <strong className={styles.availableAmount}>
              {getFormattedNumber(availableAmount)}
            </strong>
            <span className={styles.denom}>{denom}</span>
          </p>
        )}
      </Box>
    </Box>
  );
};
