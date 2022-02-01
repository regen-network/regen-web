import React from 'react';
import { makeStyles, useTheme, DefaultTheme as Theme } from '@mui/styles';
import ArrowDownIcon from '../icons/ArrowDownIcon';

interface PrevNextButtonProps {
  direction: 'next' | 'prev';
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void | undefined;
  disabled?: boolean;
  dark?: boolean;
}

const getTextColor = (
  theme: Theme,
  disabled: boolean,
  dark: boolean,
): string => {
  if (dark) {
    return disabled ? theme.palette.info.light : theme.palette.primary.main;
  } else {
    return disabled ? theme.palette.grey[400] : theme.palette.secondary.main;
  }
};

const getBorderColor = (
  theme: Theme,
  disabled: boolean,
  dark: boolean,
): string => {
  if (dark) {
    return disabled ? theme.palette.grey[100] : theme.palette.secondary.main;
  } else {
    return disabled
      ? theme.palette.grey[400]
      : theme.palette.secondary.contrastText;
  }
};

const getBackgroundColor = (
  theme: Theme,
  disabled: boolean,
  dark: boolean,
): string => {
  if (dark) {
    return disabled ? theme.palette.grey[100] : theme.palette.secondary.main;
  } else {
    return disabled ? theme.palette.grey[200] : theme.palette.primary.main;
  }
};

const useStyles = makeStyles<Theme, { disabled: boolean; dark: boolean }>(
  theme => ({
    root: props => ({
      borderRadius: '50%',
      fontSize: theme.spacing(6),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${getBorderColor(theme, props.disabled, props.dark)}`,
      backgroundColor: getBackgroundColor(theme, props.disabled, props.dark),
      boxSizing: 'border-box',
      boxShadow: 'none',
      opacity: props.disabled ? 0.4 : 1,
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(12.5),
        height: theme.spacing(12.5),
      },
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
    }),
  }),
);

export default function PrevNextButton({
  direction,
  onClick,
  disabled = false,
  dark = false,
}: PrevNextButtonProps): JSX.Element {
  const theme = useTheme();
  const styles = useStyles({ disabled: !!disabled, dark: !!dark });
  return (
    <div
      className={styles.root}
      onClick={disabled ? undefined : onClick}
      aria-label={direction}
    >
      <ArrowDownIcon
        direction={direction}
        color={getTextColor(theme, disabled, dark)}
      />
    </div>
  );
}
