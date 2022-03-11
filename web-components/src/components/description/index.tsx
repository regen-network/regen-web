import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { getFontSize, FontSizes } from '../../theme/sizing';
import clsx from 'clsx';

export interface DescriptionProps {
  children?: any;
  fontSize?: FontSizes;
  className?: string;
  align?: TypographyProps['align'];
  sx?: SxProps<Theme>;
}

interface StyleProps {
  fontSize: FontSizes;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    color: theme.palette.info.dark,
    marginBottom: theme.spacing(1.5),
    whiteSpace: 'pre-wrap',
    [theme.breakpoints.up('sm')]: {
      fontSize: props.fontSize.sm,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: props.fontSize.xs,
    },
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  }),
}));

export default function Description({
  children,
  fontSize = getFontSize('medium'),
  className,
  sx,
  ...props
}: DescriptionProps): JSX.Element {
  const classes = useStyles({ fontSize });
  return (
    <Typography
      {...props}
      sx={sx}
      component="div"
      className={clsx(classes.root, className)}
    >
      {children}
    </Typography>
  );
}
