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
    color: theme.palette.info.dark,
  },
  availableAmount: {
    fontFamily: 'Muli',
    fontSize: '12px',
    color: theme.palette.info.dark,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  availableType: {
    fontFamily: 'Muli',
    fontSize: '12px',
    color: theme.palette.info.dark,
  },
}));

interface AvailableProp {
  amount: number;
  type: string;
}

interface LabelWithHelperTextProp {
  label: string;
  available: AvailableProp;
}

const LabelWithHelperText: React.FC<LabelWithHelperTextProp> = ({
  label,
  available,
}) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between">
      <span>{label}</span>
      <span>
        <span className={classes.availableLabel}>Available:</span>{' '}
        <span className={classes.availableAmount}>{available.amount}</span>
        <span className={classes.availableType}>{available.type}</span>
      </span>
    </Grid>
  );
};

export default LabelWithHelperText;
