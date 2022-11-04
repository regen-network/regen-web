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
import Img, { FluidObject } from 'gatsby-image';

import { PresskitEnableSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(32),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
    },
  },
  text: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingLeft: theme.spacing(10),
      flexGrow: 0,
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(14),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.spacing(170),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(152),
    },
    marginRight: 'auto',
  },
  imageContainer: {
    position: 'relative',
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      flexBasis: '50%',
      maxWidth: '50%',
    },
  },
  imageBackground: {
    position: 'absolute',
    width: '90%',
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(-6.25),
    },
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(-3),
    },
  },
  image: {
    zIndex: 1,
  },
}));

const query = graphql`
  query presskitEnableSection {
    background: file(relativePath: { eq: "image-topo-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityPresskitPage {
      enableSection {
        title
        _rawBody
        image {
          ...fluidCustomImageFields_withWebp
        }
      }
    }
  }
`;

const EnableSection = (): JSX.Element => {
  const styles = useStyles();
  const { background, sanityPresskitPage: data } =
    useStaticQuery<PresskitEnableSectionQuery>(query);
  const content = data?.enableSection;
  return (
    <div className={styles.root}>
      <Grid container alignItems="center">
        <Grid xs={12} item className={styles.imageContainer}>
          <Img
            className={styles.image}
            fluid={content?.image?.image?.asset?.fluid as FluidObject}
          />
          <div className={styles.imageBackground}>
            <Img fluid={background?.childImageSharp?.fluid as FluidObject} />
          </div>
        </Grid>
        <Grid xs={12} item className={styles.text}>
          <Title variant="h2">{content?.title}</Title>
          <Body as="div" size="lg" sx={{ pt: [4, 7] }}>
            <BlockContent content={content?._rawBody} />
          </Body>
        </Grid>
      </Grid>
    </div>
  );
};

export default EnableSection;
