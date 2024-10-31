import React, { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

import Section from './index';

export interface OnBoardingSectionProps {
  title: string;
  description?: string | JSX.Element;
  headerChildren?: ReactNode;
  formContainer?: boolean; // set max width and center
  exampleProjectChildren?: ReactNode;
  classes?: {
    root?: string;
    title?: string;
    titleWrap?: string;
    formWrap?: string;
    description?: string;
  };
}

const useStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12.5, 0, 30),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8.75, 2.5, 20),
    },
  },
  formWrap: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(140),
      margin: '0 auto',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      flex: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'inherit',
      flex: 1,
    },
  },
  titleWrap: {
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      maxWidth: theme.spacing(140),
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'inherit',
    },
  },
}));

const OnBoardingSection: React.FC<
  React.PropsWithChildren<OnBoardingSectionProps>
> = ({
  formContainer = false,
  exampleProjectChildren,
  classes,
  title,
  description,
  children,
  headerChildren,
}) => {
  const { classes: styles, cx } = useStyles();
  const { root, title: titleStyles, titleWrap } = styles;

  return (
    <Section
      classes={{
        root: cx(root, !!classes && classes.root),
        title: cx(titleStyles, !!classes && classes.title),
        titleWrap: cx(titleWrap, !!classes && classes.titleWrap),
        description: classes?.description,
      }}
      title={title}
      titleAlign={'center'}
      titleVariant="h3"
      description={description}
      headerChildren={headerChildren}
    >
      <div
        className={cx(
          formContainer && styles.formWrap,
          !!classes && classes.formWrap,
        )}
      >
        {exampleProjectChildren ? exampleProjectChildren : null}
        {children}
      </div>
    </Section>
  );
};

export default OnBoardingSection;
