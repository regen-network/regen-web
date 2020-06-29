import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStaticQuery, graphql } from 'gatsby';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import FeaturedCard from 'web-components/lib/components/cards/FeaturedCard';
import Section from '../../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
  },
}));

const ApproachSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: contentYaml {
        featuredSection {
          header
          title
          image {
            childImageSharp {
              fixed(quality: 90) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
          description
        }
      }
    }
  `);
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  
  const content = data.text.featuredSection;

  return (
    <Section className={classes.section} title={content.header} titleVariant="subtitle1">
      <FeaturedCard />
    </Section>
  );
};

export default ApproachSection;
