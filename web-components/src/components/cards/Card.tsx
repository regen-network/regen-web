import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Card from '@mui/material/Card';
import { SxProps } from '@mui/material';

interface RegenCardProps {
  children?: any;
  width?: string;
  height?: string;
  onClick?: () => void;
  elevation?: number;
  borderColor?: string;
  borderRadius?: string;
  className?: string;
  sx?: SxProps<Theme>;
}

interface StyleProps {
  width?: string;
  height?: string;
  borderColor?: string;
  borderRadius?: string;
  onClick?: () => void;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    border: `1px solid ${props.borderColor || theme.palette.info.light}`,
    borderRadius: props.borderRadius || '5px',
    maxWidth: props.width || '100%',
    height: props.height || 'inherit',
    cursor: props.onClick ? 'pointer' : 'inherit',
  }),
}));

export default function RegenCard({
  children,
  width,
  height,
  onClick,
  elevation = 0,
  borderColor,
  borderRadius,
  className,
  sx,
}: RegenCardProps): JSX.Element {
  const classes = useStyles({
    width,
    height,
    borderColor,
    borderRadius,
    onClick,
  });
  return (
    <Card
      onClick={onClick}
      className={`${classes.root} ${className}`}
      elevation={elevation}
      sx={sx}
    >
      {children}
    </Card>
  );
}
