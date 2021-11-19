import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Section from 'web-components/lib/components/section';
import { TitleWithParagraphs } from './ApproachSection';
import { CaseStudyFundingSectionQuery, SanityCaseStudyFundingSection } from '../../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  image: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
}));

const query = graphql`
  query CaseStudyFundingSection {
    sanityCaseStudiesPage {
      fundingSection {
        _rawHeader
        details
        results
        next
      }
    }
  }
`;

const FundingSection: React.FC<SanityCaseStudyFundingSection> = ({
  _rawDetails,
  _rawResults,
  _rawNext,
  image,
}) => {
  const classes = useStyles();
  const data = useStaticQuery<CaseStudyFundingSectionQuery>(query);
  const content = data?.sanityCaseStudiesPage?.fundingSection;

  return (
    <Section className={classes.root}>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <Img className={classes.image} fluid={image?.image?.asset?.fluid as FluidObject} />
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <TitleWithParagraphs
            title={<div className={classes.title}>{<BlockContent content={content?._rawHeader} />}</div>}
            paragraphs={[
              { title: content?.details || '', content: _rawDetails },
              { title: content?.results || '', content: _rawResults },
              { title: content?.next || '', content: _rawNext },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={{ xs: 'none', sm: 'block' }}>
            <Img className={classes.image} fluid={image?.image?.asset?.fluid as FluidObject} />
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};

export default FundingSection;
