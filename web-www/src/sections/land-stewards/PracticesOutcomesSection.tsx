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

const PracticesOutcomesSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: landStewardsYaml {
        practicesOutcomesSection {
          header
          practices {
            header
            items {
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
    }
  `);
  const content = data.text.practicesOutcomesSection;
  const classes = useStyles({});
  const practicesItems: ImageItemProps[] = content.practices.items.map(({ image, header: title, description }) => ({
    img: <img src={image.publicURL} alt={image.publicURL} />,
    title,
    description,
  }));

  return (
    <Section withSlider className={classes.root} title={content.header}>
      <ImageItems title={content.practices.header} arrows slidesToShow={4} items={practicesItems} />
    </Section>
  );
};

export default PracticesOutcomesSection;
