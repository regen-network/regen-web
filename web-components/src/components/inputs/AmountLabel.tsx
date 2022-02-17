import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Theme } from '../../theme/muiTheme';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    marginTop: theme.spacing(10.75),
  },
  availableLabel: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: theme.palette.info.dark,
  },
  availableAmount: {
    fontFamily: 'Muli',
    fontSize: '12px',
    color: theme.palette.info.dark,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  batchDenom: {
    fontFamily: 'Muli',
    fontSize: '12px',
    color: theme.palette.info.dark,
  },
}));

interface AmountLabelProps {
  label?: string;
  availableAmount: number;
  batchDenom: string;
}

const AmountLabel: React.FC<AmountLabelProps> = ({
  label = 'Amount',
  availableAmount,
  batchDenom,
}) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="space-between">
      <span>{label}</span>
      <span>
        <span className={classes.availableLabel}>Available:</span>{' '}
        <span className={classes.availableAmount}>{availableAmount}</span>
        <span className={classes.batchDenom}>{batchDenom}</span>
      </span>
    </Grid>
  );
};

export default AmountLabel;
