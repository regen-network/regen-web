import React, { ReactChild } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import BackgroundImage from 'gatsby-background-image';
import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import clsx from 'clsx';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Section from 'web-components/src/components/section';

interface FAQSectionProps {
  category?: string;
  imageData: FluidObject;
  header: string;
  children?: ReactChild;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(20),
      paddingTop: theme.spacing(52.5),
      paddingBottom: theme.spacing(52.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(56.25),
      paddingBottom: theme.spacing(56.25),
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  button: {
    textAlign: 'center',
  },
  title: {
    maxWidth: theme.spacing(172),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.5),
    },
  },
  withChildren: {
    '& $title': {
      paddingBottom: 0,
    },
  },
  children: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const FAQSection = ({ header, imageData, category, children }: FAQSectionProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <BackgroundImage Tag="div" fluid={imageData}>
      <Section
        titleColor={theme.palette.primary.main}
        titleClassName={classes.title}
        className={clsx(classes.root, children && classes.withChildren)}
        title={header}
      >
        {children ? (
          <div className={classes.children}>{children}</div>
        ) : (
          <div className={classes.button}>
            <Link to={`/faq/${category || ''}`}>
              <ContainedButton>view faq</ContainedButton>
            </Link>
          </div>
        )}
      </Section>
    </BackgroundImage>
  );
};

export default FAQSection;
