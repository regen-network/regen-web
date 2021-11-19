import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import clsx from 'clsx';

import BackgroundSection from '../../../components/BackgroundSection';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import { BlockContent } from 'web-components/src/components/block-content';
import {
  CaseStudyConclusionSectionQuery,
  SanityCaseStudyConclusionSection,
} from '../../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(6),
    },
  },
  description: {
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
  },
  withMargin: {
    [theme.breakpoints.down('xs')]: {
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
  imageTitle: {
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(4),
    },
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

const ConclusionSection: React.FC<SanityCaseStudyConclusionSection> = ({ _rawDescription, images }) => {
  const styles = useStyles();
  const { bg, sanityCaseStudiesPage: content } = useStaticQuery<CaseStudyConclusionSectionQuery>(query);
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
                className={images.length > 1 && i > 0 ? clsx(styles.withMargin, styles.image) : styles.image}
              />
              {img?.title && <Description className={styles.imageTitle}>{img.title}</Description>}
            </div>
          ))}
        </Grid>
        <Grid item xs={12} sm={7}>
          <Title variant="h2" className={styles.title}>
            {content?.conclusionSectionHeader}
          </Title>
          <Description className={styles.description}>
            <BlockContent content={_rawDescription} />
          </Description>
        </Grid>
      </Grid>
    </BackgroundSection>
  );
};

export default ConclusionSection;
