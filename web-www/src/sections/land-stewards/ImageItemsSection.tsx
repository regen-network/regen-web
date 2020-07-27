import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import Section from '../../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
}));

const ImageItemsSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: landStewardsYaml {
        imageItemsSection {
          header
          imageItems {
            image {
              extension
              publicURL
            }
            header
            description
          }
        }
      }
    }
  `);
  const content = data.text.imageItemsSection;
  const classes = useStyles({});
  const imageItems: ImageItemProps[] = content.imageItems.map(({ image, header: title, description }) => ({
    img:  <img src={image.publicURL} alt={image.publicURL} />,
    title,
    description,
  }));

  return (
    <Section withSlider className={classes.root} title={content.header}>
      <ImageItems items={imageItems} />
    </Section>
  );
};

export default ImageItemsSection;
