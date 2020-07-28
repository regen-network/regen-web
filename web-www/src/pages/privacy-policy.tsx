import React from 'react';
import SEO from '../components/seo';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Title from 'web-components/lib/components/title';
import clsx from 'clsx';
import MarkdownSection from '../components/MarkdownSection';
import { ThemeConsumer } from 'styled-components';

const useStyles = makeStyles((theme: Theme) => ({
  sectionPadding: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(37.5),
      paddingRight: theme.spacing(38.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2.8),
      paddingRight: theme.spacing(2.8),
    },
  },
  title: {
    maxWidth: theme.spacing(350),
    margin: '0px auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(48.75),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(9.5),
      paddingTop: theme.spacing(18.25),
    },
  },
  text: {
    fontSize: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    lineHeight: '150%',
    maxWidth: theme.spacing(350),
    margin: '0px auto',
    color: theme.palette.info.dark,
    '& p:first-of-type': {
      marginBottom: theme.spacing(11.25),
    },
    '& ol, ul': {
      marginLeft: theme.spacing(10),
    },
    '& a, a:visited': {
      textDecoration: 'none',
      color: theme.palette.info.dark,
    },
    '& h2': {
      color: theme.palette.primary.contrastText,
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(10.5),
      fontFamily: theme.typography.h1.fontFamily,
      fontWeight: 900,
      lineHeight: '150%',
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(5.25),
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4.8),
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
      },
    },
    '& h4': {
      marginBottom: theme.spacing(7.25),
      marginTop: theme.spacing(10.5),
      color: theme.palette.primary.contrastText,
      fontSize: theme.spacing(4.7),
      textTransform: 'uppercase',
      letterSpacing: theme.spacing(0.2),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(4),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
      },
    },
  },
}));

const PrivacyPolicy = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/^.*/privacy-policy.md$/" }) {
        html
      }
    }
  `);
  return (
    <>
      <SEO title="Privacy Policy" />
      <MarkdownSection title="Privacy Policy" mdContent={data.markdownRemark.html} />
    </>
  );
};

export default PrivacyPolicy;
