import { ButtonProps, Grid } from '@mui/material';

import { Button } from '../../buttons/Button';
import ContainedButton from '../../buttons/ContainedButton';

export interface Props extends ButtonProps {
  label: string;
  onCancel: () => void;
}

const CancelButtonFooter = ({
  onCancel,
  label,
  ...props
}: Props): JSX.Element => {
  return (
    <Grid container alignItems="center" justifyContent="flex-end">
      <Grid item>
        <Button
          onClick={onCancel}
          sx={{
            color: 'info.main',
            fontSize: [14, 12],
            padding: [0],
            marginRight: [10],
            border: 'none',
          }}
        >
          cancel
        </Button>
      </Grid>
      <Grid item>
        <ContainedButton {...props}>{label}</ContainedButton>
      </Grid>
    </Grid>
  );
};

export { CancelButtonFooter };
