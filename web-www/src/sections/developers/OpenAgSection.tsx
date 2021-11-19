import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SanityImage from 'gatsby-plugin-sanity-image';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import { BlockContent } from 'web-components/src/components/block-content';
import BackgroundSection from '../../components/BackgroundSection';
import { DevOpenAgSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(27.5),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  image: {
    borderRadius: '10px',
  },
}));

const query = graphql`
  query devOpenAgSection {
    background: file(relativePath: { eq: "developers-topo-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allSanityDevelopersPage {
      nodes {
        openAgSection {
          header
          _rawBody
          image {
            ...ImageWithPreview
          }
        }
      }
    }
  }
`;

const OpenAgSection: React.FC = () => {
  const styles = useStyles();
  const data = useStaticQuery<DevOpenAgSectionQuery>(query);
  const content = data?.allSanityDevelopersPage?.nodes[0].openAgSection;

  return (
    <BackgroundSection
      linearGradient="unset"
      topSection={false}
      imageData={data?.background?.childImageSharp?.fluid as any}
      className={styles.section}
    >
      <Grid container alignItems="center" spacing={8}>
        <Grid item xs={12} sm={6}>
          <SanityImage alt={`${content?.header}`} className={styles.image} {...(content?.image as any)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Title className={styles.title} variant="h3">
            {content?.header}
          </Title>
          <Description className={styles.description}>
            <BlockContent content={content?._rawBody} />
          </Description>
        </Grid>
      </Grid>
    </BackgroundSection>
  );
};

export default OpenAgSection;
