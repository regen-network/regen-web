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
import BackgroundImage from 'gatsby-background-image';
import Img, { FluidObject } from 'gatsby-image';

import { SanityCaseStudyContextSection } from '../../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(22.5),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(10),
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
      paddingLeft: theme.spacing(5),
    },
  },
  image: {
    float: 'right',
    width: '100%',
  },
  grid: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
    },
  },
  text: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(15),
      flexGrow: 0,
      flexBasis: '60%',
      maxWidth: '60%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.spacing(170),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(196),
    },
    marginLeft: 'auto',
  },
  list: {
    listStyle: 'none',
    counterReset: 'challenge-counter',
  },
  imageContainer: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      flexBasis: '40%',
      maxWidth: '40%',
    },
  },
}));

const query = graphql`
  query CaseStudyContextSection {
    bg: file(relativePath: { eq: "topo-bg-top.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    imageBg: file(relativePath: { eq: "image-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityCaseStudiesPage {
      contextSection {
        header
        challenges
      }
    }
  }
`;

const ContextSection: React.FC<SanityCaseStudyContextSection> = ({
  _rawDescription,
  image,
  challenges,
}) => {
  const styles = useStyles();
  const data = useStaticQuery(query);
  const content = data?.sanityCaseStudiesPage?.contextSection;
  return (
    <BackgroundImage fluid={data.bg.childImageSharp.fluid}>
      <div className={styles.root}>
        <Grid className={styles.grid} container wrap="nowrap" gap={3}>
          <Grid item xs={12} className={styles.text}>
            <Title variant="h2" sx={{ pt: { tablet: 6 }, pb: 4 }}>
              {content?.header}
            </Title>
            <Body as="div" size="xl" color="info.dark" sx={{ mb: 4 }}>
              <BlockContent content={_rawDescription} />
            </Body>
            <Title variant="h2" sx={{ mt: [4, 7], mb: [2, 3] }}>
              {content.challenges}
            </Title>
            <ol className={styles.list}>
              {challenges?.map((text, i) => (
                <Body
                  key={i}
                  size="xl"
                  as="li"
                  sx={{
                    py: 1.25,
                    counterIncrement: `challenge-counter`,
                    '&::before': {
                      content: 'counter(challenge-counter)',
                      color: 'secondary.main',
                      fontWeight: 900,
                      marginLeft: -6,
                      marginRight: 2.75,
                      fontSize: [18, 22],
                      fontFamily: 'h1.fontFamily',
                    },
                  }}
                >
                  {text}
                </Body>
              ))}
            </ol>
          </Grid>
          <Grid item xs={12} className={styles.imageContainer}>
            <Img
              fluid={image?.image?.asset?.fluid as FluidObject}
              className={styles.image}
            />
          </Grid>
        </Grid>
      </div>
    </BackgroundImage>
  );
};

export default ContextSection;
