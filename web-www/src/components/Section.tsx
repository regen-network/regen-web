import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { Variant } from '@material-ui/core/styles/createTypography';

import Title from 'web-components/lib/components/title';

interface SectionProps {
  children?: any;
  className?: string;
  title?: string;
  titleVariant?: Variant;
  withSlider?: boolean;
  titleLineHeight?: string;
}

interface StyleProps {
  withSlider: boolean;
  titleLineHeight?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(22.25),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: props.withSlider ? 0 : theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingTop: theme.spacing(17.75),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
  }),
  title: props => ({
    lineHeight: props.titleLineHeight || '140%',
    [theme.breakpoints.up('sm')]: {
      paddingRight: '8%',
      paddingLeft: '8%',
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: props.withSlider ? theme.spacing(4) : 0,
    },
  }),
}));

const Section = ({ children, className, titleLineHeight, titleVariant = 'h2', title, withSlider = false }: SectionProps) => {
  const classes = useStyles({ withSlider, titleLineHeight });
  return (
    <div className={clsx(classes.root, className)}>
      {title && (
        <Title className={classes.title} variant={titleVariant} align="center">
          {title}
        </Title>
      )}
      {children}
    </div>
  );
};

export default Section;
