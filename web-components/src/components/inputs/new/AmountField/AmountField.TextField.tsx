import { forwardRef } from 'react';
import { Grid, Theme } from '@mui/material';

import TextField from '../TextField/TextField';
import { RegenTextFieldProps } from '../TextField/TextField.types';

interface AmountTextFieldProps extends RegenTextFieldProps {
  availableAmount: number;
  maxLabel: string;
  onMaxClick?: (amount: number) => void;
}

export const AmountTextField = forwardRef<HTMLDivElement, AmountTextFieldProps>(
  ({ availableAmount, maxLabel, onMaxClick, ...props }, ref) => {
    return (
      <TextField
        {...props}
        ref={ref}
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
            onClick={() => onMaxClick && onMaxClick(availableAmount ?? 0)}
          >
            {maxLabel}
          </Grid>
        }
      />
    );
  },
);
