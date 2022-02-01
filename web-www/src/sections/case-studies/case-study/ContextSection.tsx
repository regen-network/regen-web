import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import { BlockContent } from 'web-components/src/components/block-content';
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
  title: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(6),
    },
  },
  description: {
    lineHeight: '150%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
  },
  image: {
    float: 'right',
    width: '100%',
  },
  grid: {
    // [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
    //   alignItems: 'center',
    // },
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
  item: {
    counterIncrement: 'challenge-counter',
    marginBottom: 0,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4.75),
    },
    '&::before': {
      content: 'counter(challenge-counter)',
      color: theme.palette.secondary.main,
      fontWeight: 900,
      marginLeft: theme.spacing(-6),
      marginRight: theme.spacing(2.75),
      fontFamily: theme.typography.h1.fontFamily,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(5.5),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(4.5),
      },
    },
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

const ContextSection: React.FC<SanityCaseStudyContextSection> = ({ _rawDescription, image, challenges }) => {
  const styles = useStyles();
  const data = useStaticQuery(query);
  const content = data?.sanityCaseStudiesPage?.contextSection;
  return (
    <BackgroundImage fluid={data.bg.childImageSharp.fluid}>
      <div className={styles.root}>
        <Grid className={styles.grid} container wrap="nowrap">
          <Grid item xs={12} className={styles.text}>
            <Title variant="h2" className={styles.title}>
              {content?.header}
            </Title>
            <Description className={styles.description}>
              {<BlockContent content={_rawDescription} />}
            </Description>
            <Title variant="h2" className={styles.title}>
              {content.challenges}
            </Title>
            <ol className={styles.list}>
              {challenges?.map((text, i) => (
                <Description key={i} component="li" className={clsx(styles.description, styles.item)}>
                  {text}
                </Description>
              ))}
            </ol>
          </Grid>
          <Grid item xs={12} className={styles.imageContainer}>
            <Img fluid={image?.image?.asset?.fluid as FluidObject} className={styles.image} />
          </Grid>
        </Grid>
      </div>
    </BackgroundImage>
  );
};

export default ContextSection;
