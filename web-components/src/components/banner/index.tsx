'use client';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from 'tss-react/mui';

import { cn } from '../../utils/styles/cn';

export interface BannerBaseProps {
  text: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

interface StyleProps {
  color?: string;
}

interface BannerProps extends BannerBaseProps, StyleProps {}

const useStyles = makeStyles<StyleProps>()((theme, { color }) => ({
  root: {
    justifyContent: 'center',
    top: '0px',
    left: '0px',
    zIndex: 1400,
    background: color || theme.palette.secondary.main,
    color: theme.palette.primary.main,
    lineHeight: '145%',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100vw',
    height: theme.spacing(17.5),
    fontSize: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      top: '0px',
      left: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3.25),
      fontSize: theme.spacing(3.5),
      height: theme.spacing(11.5),
    },
  },
}));

export default function Banner({
  text,
  color,
  duration = 5000,
  onClose,
  className,
}: BannerProps): JSX.Element {
  const { classes } = useStyles({ color });
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      className={cn(classes.root, className)}
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
