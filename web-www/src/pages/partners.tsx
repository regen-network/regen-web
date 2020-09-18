import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Section from 'web-components/lib/components/section';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    padding: 0,
    overflow: 'hidden',
  },
}));

const data = useStaticQuery(graphql`
  query {
    partnersYaml {
      partnerLogos {
        image {
          extension
          publicURL
        }
      }
    }
  }
`);

const PartnersPage = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <SEO title="Partners" />
      <Section className={classes.section}></Section>
    </>
  );
};

export default PartnersPage;
