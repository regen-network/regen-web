import React from 'react';
import { makeStyles, Theme, Radio as MuiRadio, RadioProps } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  radioBtn: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.primary.main,
    '$root.Mui-focusVisible &': {
      outline: `2px auto ${theme.palette.secondary.main}`,
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: theme.palette.grey[300],
    },
  },
  checkedRadioBtn: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: 'none',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: `radial-gradient(${theme.palette.primary.main},${theme.palette.primary.main} 33%,transparent 40%)`,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

/** Custom styles on top of MUI's `Radio` component */
const Radio: React.FC<RadioProps> = props => {
  const classes = useStyles();
  return (
    <MuiRadio
      {...props}
      checkedIcon={<span className={clsx(classes.radioBtn, classes.checkedRadioBtn)} />}
      icon={<span className={classes.radioBtn} />}
    />
  );
};

export default Radio;
