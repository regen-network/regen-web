import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import SanityImage from 'gatsby-plugin-sanity-image';

import BackgroundSection from '../../components/BackgroundSection';
import { DevOpenAgSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(27.5),
    },
  },
  image: {
    borderRadius: '10px',
    maxWidth: '100%',
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
    sanityDevelopersPage {
      openAgSection {
        header
        _rawBody
        image {
          ...ImageWithPreview
        }
      }
    }
  }
`;

const OpenAgSection: React.FC = () => {
  const styles = useStyles();
  const { background, sanityDevelopersPage } =
    useStaticQuery<DevOpenAgSectionQuery>(query);
  const data = sanityDevelopersPage?.openAgSection;

  return (
    <BackgroundSection
      linearGradient="unset"
      topSection={false}
      imageData={background?.childImageSharp?.fluid as FluidObject}
      className={styles.section}
    >
      <Grid container alignItems="center" spacing={8}>
        <Grid item xs={12} sm={6}>
          {data?.image && (
            <SanityImage
              alt={`${data?.header}`}
              className={styles.image}
              {...(data.image as any)}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Title variant="h3" sx={{ pb: [4, 6] }}>
            {data?.header}
          </Title>
          <Body as="div" size="lg">
            <BlockContent content={data?._rawBody} />
          </Body>
        </Grid>
      </Grid>
    </BackgroundSection>
  );
};

export default OpenAgSection;
