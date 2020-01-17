import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
// import Fab from '@material-ui/core/Fab';
// import Button from '@material-ui/core/Button';
import ArrowDownIcon from '../icons/ArrowDownIcon';

interface PrevNextButtonProps {
  direction: 'next' | 'prev';
  onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '50%',
    border: '2px solid #B9E1C7',
    boxSizing: 'border-box',
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(12.5),
      height: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
}));

export default function PrevNextButton({ direction, onClick }: PrevNextButtonProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles({ direction });
  return (
    <div className={classes.root} onClick={onClick}>
      <ArrowDownIcon direction={direction} color={theme.palette.secondary.main} />
    </div>
  );
}
