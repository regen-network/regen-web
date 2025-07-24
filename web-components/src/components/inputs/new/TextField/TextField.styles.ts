import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

type UseStylesParams = {
  error: boolean;
  label: ReactNode;
};

export const useTextFieldStyles = makeStyles<UseStylesParams>()(
  (theme, { error, label }) => ({
    root: {
      '& label': {
        lineHeight: '140%',
        transform: 'scale(1)',
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold',
        position: 'relative',
        textAlign: 'left',
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(4.5),
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(4),
        },
        '&.Mui-focused': {
          display: 'block',
        },
        '&.Mui-disabled': {
          color: theme.palette.primary.contrastText,
        },
      },
      '& .MuiInputBase-formControl': {
        marginTop: label ? theme.spacing(2.25) : 0,
        '&.Mui-disabled': {
          backgroundColor: theme.palette.info.light,
        },
      },
      '& .MuiFormHelperText-root': {
        fontWeight: 'bold',
        color: theme.palette.primary.light,
        position: error ? 'absolute' : 'inherit',
        lineHeight: error ? 1.3 : 1.66,
        bottom: error ? theme.spacing(-5) : 0,
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(3.5),
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(3),
        },
        '&.MuiFormHelperText-filled': {
          color: theme.palette.info.main,
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
      },
      '& .MuiInputBase-root': {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.grey[100]}`,
        borderRadius: '2px',
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(3.75),
          paddingRight: theme.spacing(3.75),
          fontSize: theme.spacing(4),
          height: theme.spacing(15), // 11.25
        },
        [theme.breakpoints.down('sm')]: {
          paddingLeft: theme.spacing(3.25),
          paddingRight: theme.spacing(3.25),
          fontSize: theme.spacing(3.5),
          height: theme.spacing(12.5), // 8.75
        },
        '& .MuiSvgIcon-root:not(.denom-icon)': {
          width: theme.spacing(3.25),
          height: theme.spacing(2.5),
          top: 'calc(50% - 5px)',
          [theme.breakpoints.up('sm')]: {
            right: theme.spacing(3.75),
          },
          [theme.breakpoints.down('sm')]: {
            right: theme.spacing(3.25),
          },
          position: 'absolute',
          pointerEvents: 'none',
        },
        '& .MuiInputAdornment-root p': {
          color: theme.palette.info.main,
        },
        '&.Mui-error': {
          '& input, & .MuiSelect-select': {
            borderColor: theme.palette.error.main,
          },
        },
      },
      '& input[type=number]': {
        '-moz-appearance': 'textfield',
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      },
      // The styles below used to be triggered by a defaultStyle prop
      // If you're migrating an old TextField with the defaultProp set to false you can do this instead:
      // sx={{ mt: { xs: 0, sm: 0 }}}
      '&:first-of-type': {
        marginTop: 0,
      },
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.typography.pxToRem(40),
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.typography.pxToRem(33),
      },
    },
  }),
);
