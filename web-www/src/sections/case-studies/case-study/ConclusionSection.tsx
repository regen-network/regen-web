import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { graphql, StaticQuery } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import Img, { FluidObject } from 'gatsby-image';
import clsx from 'clsx';

import BackgroundSection from '../../../components/BackgroundSection';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

interface Image {
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  title?: string;
}

interface ConclusionSectionProps {
  description: string;
  images: Image[];
}

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

const ConclusionSection = ({ description, images }: ConclusionSectionProps): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          bg: file(relativePath: { eq: "topo-bg-top.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: caseStudiesYaml {
            caseStudies {
              conclusionSection {
                header
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.caseStudies.conclusionSection;
        return (
          <BackgroundSection
            topSection={false}
            linearGradient="unset"
            imageData={data.bg.childImageSharp.fluid}
            className={classes.root}
          >
            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} sm={5}>
                {images.map((img: Image, i: number) => (
                  <div key={i}>
                    <Img
                      fluid={img.image.childImageSharp.fluid}
                      className={
                        images.length > 1 && i > 0 ? clsx(classes.withMargin, classes.image) : classes.image
                      }
                    />
                    {img.title && <Description className={classes.imageTitle}>{img.title}</Description>}
                  </div>
                ))}
              </Grid>
              <Grid item xs={12} sm={7}>
                <Title variant="h2" className={classes.title}>
                  {content.header}
                </Title>
                <Description className={classes.description}>{ReactHtmlParser(description)}</Description>
              </Grid>
            </Grid>
          </BackgroundSection>
        );
      }}
    />
  );
};

export default ConclusionSection;
