import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
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
  const disabledColor = dark
    ? theme.palette.grey[100]
    : theme.palette.grey[400];
  return disabled
    ? // eslint-disable-next-line lingui/no-unlocalized-strings
      `linear-gradient(${disabledColor}, ${disabledColor})`
    : // eslint-disable-next-line lingui/no-unlocalized-strings
      'linear-gradient(204.4deg, #527984 5.94%, #79C6AA 51.92%, #C4DAB5 97.89%)';
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

const useStyles = makeStyles<UseStylesParams>()((theme, { dark, disabled }) => {
  const backgroundColor = getBackgroundColor(theme, disabled, dark);
  const borderColor = getBorderColor(theme, disabled, dark);
  return {
    root: {
      borderRadius: '50%',
      fontSize: theme.spacing(6),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px double transparent',
      backgroundImage: `linear-gradient(${backgroundColor}, ${backgroundColor}), 
      ${borderColor}`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
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
  };
});

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
