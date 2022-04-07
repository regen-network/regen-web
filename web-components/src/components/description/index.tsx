import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { Variant } from '@mui/material/styles/createTypography';
import clsx from 'clsx';

import { getFontSize, FontSizes } from '../../theme/sizing';

export interface DescriptionProps {
  children?: any;
  fontSize?: FontSizes;
  className?: string;
  align?: TypographyProps['align'];
  sx?: SxProps<Theme>;
  variant?: Variant;
}

interface StyleProps {
  fontSize: FontSizes;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    color: theme.palette.info.dark,
    marginBottom: theme.spacing(1.5),
    whiteSpace: 'pre-wrap',
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  fontSize: props => ({
    [theme.breakpoints.up('sm')]: {
      fontSize: props.fontSize.sm,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: props.fontSize.xs,
    },
  }),
}));

export default function Description({
  children,
  fontSize = getFontSize('medium'),
  className,
  sx,
  variant,
  ...props
}: DescriptionProps): JSX.Element {
  const styles = useStyles({ fontSize });
  const defaultClasses = [styles.root, className];
  const classes = variant ? defaultClasses : [fontSize, ...defaultClasses];

  return (
    <Typography
      sx={sx}
      component="div"
      className={clsx(classes)}
      variant={variant}
      {...props}
    >
      {children}
    </Typography>
  );
}
