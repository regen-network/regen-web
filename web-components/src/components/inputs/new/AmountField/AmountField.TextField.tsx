import { forwardRef } from 'react';
import { Grid, Theme } from '@mui/material';

import { RegenTextFieldProps } from '../TextField/TextField.types';
import TextFieldBase from '../TextFieldBase/TextFieldBase';

interface AmountTextFieldProps extends RegenTextFieldProps {
  availableAmount: number;
  onMaxClick?: (amount: number) => void;
}

export const AmountTextField = forwardRef<HTMLDivElement, AmountTextFieldProps>(
  ({ availableAmount, onMaxClick, ...props }, ref) => {
    return (
      <TextFieldBase
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
            max
          </Grid>
        }
      />
    );
  },
);
