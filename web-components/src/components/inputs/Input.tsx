import React from 'react';
import { Input as MuiInput, InputProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  input: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '2px',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      fontSize: theme.typography.pxToRem(16),
      lineHeight: theme.typography.pxToRem(24),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(21),
    },
    '& .MuiInputAdornment-root p': {
      color: theme.palette.info.main,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.info.light,
    },
    '&.Mui-error': {
      '& input, & .MuiSelect-select': {
        borderColor: theme.palette.error.main,
      },
    },
  },
}));

/** Custom styles on top of MUI's `Input` component */
const Input: React.FC<React.PropsWithChildren<InputProps>> = ({
  className,
  ...props
}) => {
  const { classes: styles, cx } = useStyles();
  return (
    <MuiInput
      {...props}
      disableUnderline
      className={cx(styles.input, className)}
    />
  );
};

export default Input;
