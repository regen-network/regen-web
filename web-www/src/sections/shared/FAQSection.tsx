import React, { ReactChild } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import Section from '@regen-network/web-components/lib/components/section';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import clsx from 'clsx';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';

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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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

const FAQSection = ({
  header,
  imageData,
  category,
  children,
}: FAQSectionProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <BackgroundImage Tag="div" fluid={imageData}>
      <Section
        classes={{
          root: clsx(classes.root, children && classes.withChildren),
          title: classes.title,
        }}
        titleColor={theme.palette.primary.main}
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
