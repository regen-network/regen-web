import React from 'react';
import { Theme, makeStyles, FormHelperText, Typography, FormControl } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
  className?: string;
  description?: string;
  disabled?: boolean;
  errorMessage?: string;
  optional?: boolean;
  label?: string;
}

interface StyleProps {
  optional?: boolean;
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  label: props => ({
    lineHeight: '140%',
    transform: 'scale(1)',
    color: props.disabled ? theme.palette.info.main : theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
    '&::after': {
      content: props.optional ? '" (optional)"' : '',
      fontWeight: 'normal',
      color: theme.palette.info.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  }),
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginTop: theme.spacing(1),
    marginBottom: 0,
    fontSize: theme.spacing(3.5),
    fontFamily: '"Lato",-apple-system,sans-serif',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  txtGray: {
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(4),
      fontSize: theme.spacing(3.3),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
      fontSize: theme.spacing(3),
    },
  },
}));

/**
 *  This component replaces MUI's `FormControl` component, and provides
 *  decorations for label, description, and error message with our custom styles
 */
export default function FieldDecorations({
  children,
  label,
  description,
  disabled,
  errorMessage,
  className,
  optional,
}: Props): JSX.Element {
  const classes = useStyles({ optional, disabled });
  return (
    <FormControl className={className} fullWidth>
      {label && <label className={classes.label}>{label}</label>}
      {description && (
        <Typography variant="body1" className={classes.txtGray}>
          {description}
        </Typography>
      )}

      {children}

      {errorMessage && <FormHelperText className={classes.error}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
