import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import ArrowDownIcon from '../icons/ArrowDownIcon';

interface PrevNextButtonProps {
  direction: 'next' | 'prev';
  onClick?: () => void;
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, { disabled: boolean }>(theme => ({
  root: props => ({
    borderRadius: '50%',
    border: `2px solid ${props.disabled ? theme.palette.grey[400] : theme.palette.secondary.contrastText}`,
    boxSizing: 'border-box',
    boxShadow: 'none',
    opacity: props.disabled ? 0.4 : 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(12.5),
      height: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    backgroundColor: props.disabled ? theme.palette.grey[200] : theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
  }),
}));

export default function PrevNextButton({ direction, onClick, disabled }: PrevNextButtonProps): JSX.Element {
  const theme = useTheme();
  const styles = useStyles({ disabled: !!disabled });
  return (
    <div className={styles.root} onClick={disabled ? undefined : onClick}>
      <ArrowDownIcon
        direction={direction}
        color={disabled ? theme.palette.grey[400] : theme.palette.secondary.main}
      />
    </div>
  );
}
