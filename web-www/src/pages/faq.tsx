import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import SEO from '../components/seo';
import Section from 'web-components/src/components/section';
import FAQ, { Group } from 'web-components/lib/components/faq';
import { DiagnosticCategory } from 'typescript';

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

const FAQPage = ({ location }): JSX.Element => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query {
      content: faqYaml {
        categories {
          name
        }
      }
      md: allMarkdownRemark(sort: { order: ASC, fields: frontmatter___title }, filter: {fileAbsolutePath: {regex: "/(faq)/.*\\.md$/"}}) {
        nodes {
          html
          frontmatter {
            description
            category
          }
        }
      }
    }
  `);

  const questions = data.md.nodes.reduce((r, a) => {
    r[a.frontmatter.category.toLowerCase().trim()] = [
      ...(r[a.frontmatter.category.toLowerCase().trim()] || []),
      { question: a.frontmatter.description, answer: a.html },
    ];
    return r;
  }, {});

  return (
    <>
      <SEO title="FAQ" />
      <div className={classes.root}>
        <Section title="FAQ" titleVariant="h1" titleClassName={classes.title} className={classes.section}>
          <FAQ
            categories={data.content.categories.map((c: { name: string }) => c.name)}
            questions={questions}
            defaultCategory={location && location.state && location.state.category}
          />
        </Section>
      </div>
    </>
  );
};

export default FAQPage;
