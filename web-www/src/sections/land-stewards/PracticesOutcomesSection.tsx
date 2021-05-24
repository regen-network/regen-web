import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';
import clsx from 'clsx';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import Description from 'web-components/lib/components/description';
import Section from 'web-components/src/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  outcomes: {
    '& .slick-slide': {
      '& div:first-child': {
        height: '100%',
      },
    },
  },
  slider: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(12),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(20.75),
    },
  },
  note: {
    float: 'right',
    paddingTop: theme.spacing(7.25),
  },
  title: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(40),
      paddingRight: theme.spacing(40),
    },
  },
}));

const PracticesOutcomesSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: landStewardsYaml {
        practicesOutcomesSection {
          header
          note
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
          outcomes {
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
  const classes = useStyles();
  const theme = useTheme();
  const practicesItems: ImageItemProps[] = content.practices.items.map(
    ({ image, header: title, description }) => ({
      img: <img src={image.publicURL} alt={image.publicURL} />,
      title,
      description,
    }),
  );
  const outcomesElement: JSX.Element[] = content.outcomes.items.map(({ image, header, description }: any) => (
    <ImpactCard name={header} imgSrc={image.publicURL} description={description} largeFontSize />
  ));

  return (
    <Section withSlider classes={{ root: classes.root, title: classes.title }} title={content.header}>
      <ImageItems
        className={classes.slider}
        title={content.practices.header}
        arrows
        slidesToShow={4}
        items={practicesItems}
      />
      <ResponsiveSlider
        itemWidth="90%"
        padding={theme.spacing(2.5)}
        className={clsx(classes.outcomes, classes.slider)}
        title={content.outcomes.header}
        arrows
        slidesToShow={3}
        items={outcomesElement}
      />
      <Description className={classes.note}>{content.note}</Description>
    </Section>
  );
};

export default PracticesOutcomesSection;
