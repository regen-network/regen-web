import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import {
  CaseStudyFundingSectionQuery,
  SanityCaseStudyFundingSection,
} from '../../../generated/graphql';
import { TitleWithParagraphs } from './ApproachSection';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
        <Img
          className={classes.image}
          fluid={image?.image?.asset?.fluid as FluidObject}
        />
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <TitleWithParagraphs
            title={
              <div className={classes.title}>
                {<BlockContent content={content?._rawHeader} />}
              </div>
            }
            paragraphs={[
              { title: content?.details || '', content: _rawDetails },
              { title: content?.results || '', content: _rawResults },
              { title: content?.next || '', content: _rawNext },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={{ xs: 'none', sm: 'block' }}>
            <Img
              className={classes.image}
              fluid={image?.image?.asset?.fluid as FluidObject}
            />
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};

export default FundingSection;
