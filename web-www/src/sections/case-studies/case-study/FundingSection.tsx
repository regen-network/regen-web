import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Section from 'web-components/lib/components/section';
import { TitleWithParagraphs } from './ApproachSection';

interface FundingSectionProps {
  details: string;
  results: string;
  next: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  image: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
}));

const FundingSection = ({ details, results, next, image }: FundingSectionProps): JSX.Element => {
  const classes = useStyles();
  return (
    <StaticQuery
      query={graphql`
        query {
          text: caseStudiesYaml {
            caseStudies {
              fundingSection {
                details
                results
                next
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.caseStudies.fundingSection;
        return (
          <Section className={classes.root}>
            <Box display={{ xs: 'block', sm: 'none' }}>
              <Img className={classes.image} fluid={image.childImageSharp.fluid} />
            </Box>
            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <TitleWithParagraphs
                  title={
                    <div>
                      Project-based funding via <span className={classes.green}>Regen Registry</span> +{' '}
                      <span className={classes.green}>Regen Ledger</span>
                    </div>
                  }
                  paragraphs={[
                    { title: content.details, content: details },
                    { title: content.results, content: results },
                    { title: content.next, content: next },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <Img className={classes.image} fluid={image.childImageSharp.fluid} />
                </Box>
              </Grid>
            </Grid>
          </Section>
        );
      }}
    />
  );
};

export default FundingSection;
