import React from 'react';
import { Radio as MuiRadio, RadioProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  radioBtn: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
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
      background: theme.palette.primary.main,
      borderColor: theme.palette.grey['100'],
      border: '1px solid',
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
const Radio: React.FC<React.PropsWithChildren<RadioProps>> = props => {
  const { classes, cx } = useStyles();
  return (
    <MuiRadio
      {...props}
      checkedIcon={
        <span className={cx(classes.radioBtn, classes.checkedRadioBtn)} />
      }
      icon={<span className={classes.radioBtn} />}
    />
  );
};

export default Radio;
