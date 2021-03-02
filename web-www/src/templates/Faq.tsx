import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, PageProps, navigate } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import SEO from '../components/seo';
import Section from 'web-components/src/components/section';
import FAQ from 'web-components/lib/components/faq';

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
      paddingTop: theme.spacing(7.5),
      paddingBottom: theme.spacing(20),
      position: 'relative',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7.5),
    },
  },
}));

interface Props extends PageProps {
  pageContext: {
    header: string;
  };
}

const FAQPage = ({ pageContext, location }: Props): JSX.Element => {
  const classes = useStyles();
  const data = useStaticQuery(graphql`
    query {
      faqYaml: faqYaml {
        categories {
          header
          questions {
            question
            answer
          }
        }
      }
    }
  `);
  const [question, setQuestion] = useState<string | null>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams) {
        setQuestion(urlParams.get('question'));
      }
    }
  }, []);

  return (
    <>
      <SEO location={location} title="FAQ" description="Explore Regen Network’s frequently asked questions" />
      <div className={classes.root}>
        <Section title="FAQ" titleVariant="h1" titleClassName={classes.title} className={classes.section}>
          <FAQ
            categories={data.faqYaml.categories}
            navigate={navigate}
            header={pageContext.header}
            question={question}
          />
        </Section>
      </div>
    </>
  );
};

export default FAQPage;
