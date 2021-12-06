import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { graphql, StaticQuery } from 'gatsby';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import ProjectMedia from 'web-components/lib/components/sliders/ProjectMedia';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  slider: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(236.5),
      paddingBottom: theme.spacing(15),
      margin: '0 auto',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
      paddingBottom: theme.spacing(9.75),
    },
  },
}));

const PhotosSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          content: pressKitYaml {
            photosSection {
              header
              photos {
                image {
                  publicURL
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.photosSection;
        return (
          <Section title={content.header} classes={{ root: classes.root, title: classes.title }}>
            <div className={classes.slider}>
              <ProjectMedia
                xsBorderRadius
                assets={content.photos.map(({ image }: { image: { publicURL: string } }) => ({
                  src: image.publicURL,
                  thumbnail: image.publicURL,
                  type: 'image',
                }))}
              />
            </div>
          </Section>
        );
      }}
    />
  );
};

export default PhotosSection;
