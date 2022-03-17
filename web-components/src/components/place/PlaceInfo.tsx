import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import cx from 'clsx';

import PinIcon from '../icons/PinIcon';

interface PlaceInfoProps {
  children?: any;
  fontSize?: string;
  smFontSize?: string;
  color?: string;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
}

interface StyleProps {
  fontSize?: string;
  color?: string;
  smFontSize?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  content: props => ({
    [theme.breakpoints.up('sm')]: {
      fontSize: props.smFontSize || props.fontSize || theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: props.fontSize || theme.spacing(3.5),
    },
    color: props.color || theme.palette.primary.contrastText,
  }),
  icon: {
    marginRight: theme.spacing(1.6),
  },
}));

export default function PlaceInfo({
  children,
  fontSize,
  color,
  smFontSize,
  iconClassName,
  showIcon,
}: PlaceInfoProps): JSX.Element {
  const styles = useStyles({ smFontSize, fontSize, color });
  return (
    <div className={styles.root}>
      {showIcon && (
        <span className={cx(styles.icon, iconClassName)}>
          <PinIcon />
        </span>
      )}
      <Typography className={styles.content}>{children}</Typography>
    </div>
  );
}
