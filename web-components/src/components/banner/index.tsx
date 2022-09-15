import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { DefaultTheme as Theme, makeStyles } from '@mui/styles';

export interface BannerBaseProps {
  text: string;
  duration?: number;
  onClose?: () => void;
}

interface StyleProps {
  color?: string;
}

interface BannerProps extends BannerBaseProps, StyleProps {}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    justifyContent: 'center',
    top: '0px',
    left: '0px',
    zIndex: 1000,
    background: props.color || theme.palette.secondary.main,
    color: theme.palette.primary.main,
    lineHeight: '145%',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(17.5),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3.25),
      fontSize: theme.spacing(3.5),
      height: theme.spacing(11.5),
    },
  }),
}));

export default function Banner({
  text,
  color,
  duration = 5000,
  onClose,
}: BannerProps): JSX.Element {
  const classes = useStyles({ color });
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      className={classes.root}
      open={open}
      onClose={() => {
        setOpen(false);
        if (onClose) {
          onClose();
        }
      }}
      autoHideDuration={duration}
    >
      <div>{text}</div>
    </Snackbar>
  );
}
