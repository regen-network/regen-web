import { Grid, Theme } from '@mui/material';

import { RegenTextFieldProps } from '../TextField/TextField';
import TextFieldBase from '../TextFieldBase/TextFieldBase';

interface AmountTextFieldProps extends RegenTextFieldProps {
  availableAmount: number;
}

export const AmountTextField: React.FC<
  React.PropsWithChildren<AmountTextFieldProps>
> = ({ availableAmount, ...props }: AmountTextFieldProps) => {
  return (
    <TextFieldBase
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
        >
          max
        </Grid>
      }
    />
  );
};
