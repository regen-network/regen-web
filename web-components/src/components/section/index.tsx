import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';
import { Variant } from '@material-ui/core/styles/createTypography';

import Title from '../title';

export interface SectionProps {
  children?: any;
  className?: string;
  classes?: {
    root?: string;
    title?: string;
    titleWrap?: string;
  };
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
  topRight: boolean;
  titleLineHeight?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
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
    textAlign: props.titleAlign || (props.topRight ? 'left' : 'center'),
    [theme.breakpoints.down('xs')]: {
      paddingRight: props.withSlider ? theme.spacing(4) : 0,
    },
  }),
  titleText: {
    flex: 2,
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
}));

const Section = ({
  children,
  classes,
  className,
  titleLineHeight,
  titleColor,
  titleVariant = 'h2',
  titleAlign = 'center',
  title,
  topRight,
  withSlider = false,
}: SectionProps): JSX.Element => {
  const styles = useStyles({ withSlider, titleLineHeight, titleAlign, titleColor, topRight: !!topRight });
  return (
    <section className={clsx(styles.root, className || (classes && classes.root))}>
      {title && (
        <div className={clsx(classes && classes.titleWrap, topRight && styles.spaceBetween)}>
          <Title
            className={clsx(styles.title, classes && classes.title)}
            variant={titleVariant}
            align={titleAlign}
          >
            {ReactHtmlParser(title)}
          </Title>
          {titleAlign === 'left' && topRight}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
