import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
  slider: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(20),
    },
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        height: 'inherit',
        [theme.breakpoints.down('xs')]: {
          paddingRight: theme.spacing(4.125),
          '&:last-child': {
            paddingRight: 0,
          },
        },
        '& > div:first-child': {
          height: '100%',
        },
      },
    },
  },
}));

const FeaturedSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          content: pressKitYaml {
            featuredSection {
              header
              articles {
                header
                author
                date
                image {
                  publicURL
                }
                url
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.featuredSection;
        const items: JSX.Element[] = content.articles.map(({ image, header, author, date, url }) => (
          <ArticleCard name={header} imgSrc={image.publicURL} author={author} date={date} url={url} />
        ));
        return (
          <Section withSlider title={content.header} classes={{ title: classes.title }}>
            <ResponsiveSlider
              infinite={false}
              className={classes.slider}
              itemWidth="90%"
              slidesToShow={3}
              items={items}
            />
          </Section>
        );
      }}
    />
  );
};

export default FeaturedSection;
