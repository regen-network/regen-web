import React from 'react';
import { useTheme } from '@mui/material';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

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

type UseStylesParams = {
  disabled: boolean;
  dark: boolean;
};

const useStyles = makeStyles<UseStylesParams>()(
  (theme, { dark, disabled }) => ({
    root: {
      borderRadius: '50%',
      fontSize: theme.spacing(6),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${getBorderColor(theme, disabled, dark)}`,
      backgroundColor: getBackgroundColor(theme, disabled, dark),
      boxSizing: 'border-box',
      boxShadow: 'none',
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(12.5),
        height: theme.spacing(12.5),
      },
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
    },
  }),
);

export default function PrevNextButton({
  direction,
  onClick,
  disabled = false,
  dark = false,
}: PrevNextButtonProps): JSX.Element {
  const theme = useTheme();
  const { classes: styles } = useStyles({ disabled: !!disabled, dark: !!dark });
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
