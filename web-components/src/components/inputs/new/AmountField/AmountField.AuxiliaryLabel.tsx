import { Box } from '@mui/material';

import { getFormattedNumber } from '../../../../utils/format';
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
          <span className={styles.availableLabel}>{availableLabel}:</span>&nbsp;
          <span className={styles.availableAmount}>
            {getFormattedNumber(availableAmount)}
          </span>
          <span className={styles.denom}>{denom}</span>
        </span>
      </Box>
    </Box>
  );
};
