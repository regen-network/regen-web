import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { Variant } from '@material-ui/core/styles/createTypography';

import Title from '../title';

export interface SectionProps {
  children?: any;
  className?: string;
  titleClassName?: string;
  title?: string;
  titleVariant?: Variant;
  withSlider?: boolean;
  titleLineHeight?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
  topRight?: JSX.Element;
}

interface StyleProps {
  withSlider: boolean;
  titleLineHeight?: string;
  titleColor?: string;
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
    color: props.titleColor || 'inherit',
    lineHeight: props.titleLineHeight || '140%',
    [theme.breakpoints.down('xs')]: {
      paddingRight: props.withSlider ? theme.spacing(4) : 0,
    },
  }),
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
}));

const Section = ({
  children,
  className,
  titleClassName,
  titleLineHeight,
  titleColor,
  titleVariant = 'h2',
  titleAlign = 'center',
  title,
  topRight,
  withSlider = false,
}: SectionProps): JSX.Element => {
  const classes = useStyles({ withSlider, titleLineHeight, titleColor });
  return (
    <section className={clsx(classes.root, className)}>
      {title && (
        <Title
          className={clsx(classes.title, titleClassName, topRight && classes.spaceBetween)}
          variant={titleVariant}
          align={titleAlign}
        >
          {title}
          {titleAlign === 'left' && topRight}
        </Title>
      )}
      {children}
    </section>
  );
};

export default Section;
