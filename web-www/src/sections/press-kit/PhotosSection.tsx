import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Section from 'web-components/lib/components/section';
import ProjectMedia, { Media } from 'web-components/lib/components/sliders/ProjectMedia';
import { PresskitPhotosSectionQuery } from '../../generated/graphql';

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

const query = graphql`
  query presskitPhotosSection {
    sanityPresskitPage {
      photosSection {
        header
        photos {
          asset {
            url
          }
        }
      }
    }
  }
`;

const PhotosSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityPresskitPage } = useStaticQuery<PresskitPhotosSectionQuery>(query);
  const data = sanityPresskitPage?.photosSection;
  const assets = (data?.photos || []).map(photo => {
    return {
      src: photo?.asset?.url,
      thumbnail: photo?.asset?.url,
      type: 'image',
    } as Media;
  });

  return (
    <Section title={data?.header || ''} classes={{ root: styles.root, title: styles.title }}>
      <div className={styles.slider}>
        <ProjectMedia xsBorderRadius assets={assets} />
      </div>
    </Section>
  );
};

export default PhotosSection;
