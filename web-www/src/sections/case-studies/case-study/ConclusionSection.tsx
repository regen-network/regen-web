import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import BackgroundSection from '../../../components/BackgroundSection';
import {
  CaseStudyConclusionSectionQuery,
  SanityCaseStudyConclusionSection,
} from '../../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  withMargin: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  image: {
    borderRadius: '10px',
    width: '100%',
  },
}));

const query = graphql`
  query CaseStudyConclusionSection {
    bg: file(relativePath: { eq: "topo-bg-top.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityCaseStudiesPage {
      conclusionSectionHeader
    }
  }
`;

const ConclusionSection: React.FC<SanityCaseStudyConclusionSection> = ({
  _rawDescription,
  images,
}) => {
  const styles = useStyles();
  const { bg, sanityCaseStudiesPage: content } =
    useStaticQuery<CaseStudyConclusionSectionQuery>(query);
  return (
    <BackgroundSection
      topSection={false}
      linearGradient="unset"
      imageData={bg?.childImageSharp?.fluid}
      className={styles.root}
    >
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={12} sm={5}>
          {images?.map((img, i) => (
            <div key={i}>
              <Img
                fluid={img?.image?.image?.asset?.fluid as FluidObject}
                className={
                  images.length > 1 && i > 0
                    ? clsx(styles.withMargin, styles.image)
                    : styles.image
                }
              />
              {img?.title && (
                <Body size="sm" pt={[3, 4]}>
                  {img.title}
                </Body>
              )}
            </div>
          ))}
        </Grid>
        <Grid item xs={12} sm={7}>
          <Title variant="h2" pt={[6, 0]}>
            {content?.conclusionSectionHeader}
          </Title>
          <Body as="div" size="xl" mt={[4, 7]}>
            <BlockContent content={_rawDescription} />
          </Body>
        </Grid>
      </Grid>
    </BackgroundSection>
  );
};

export default ConclusionSection;
