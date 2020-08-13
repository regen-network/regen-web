import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import SEO from '../components/seo';
import Section from '../components/Section';
import FAQ, { Group } from 'web-components/lib/components/faq';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(13.75),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(20),
      position: 'relative',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(5),
    },
  },
}));

const FAQPage = (): JSX.Element => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query {
      md: allMarkdownRemark(sort: { order: ASC, fields: frontmatter___title }, filter: {fileAbsolutePath: {regex: "/(faq)/.*\\.md$/"}}) {
        group(field: frontmatter___category) {
          nodes {
            html
            frontmatter {
              description
            }
          }
          fieldValue
        }
      }
    }
  `);

  const categories: Group[] = data.md.group.map(g => ({
    name: g.fieldValue,
    questions: g.nodes.map(n => ({ question: n.frontmatter.description, answer: n.html })),
  }));

  return (
    <>
      <SEO title="FAQ" />
      <div className={classes.root}>
        <Section title="FAQ" titleVariant="h1" titleClassName={classes.title} className={classes.section}>
          <FAQ categories={categories} />
        </Section>
      </div>
    </>
  );
};

export default FAQPage;
