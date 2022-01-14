import React from 'react';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { PresskitFeaturedSectionQuery } from '../../generated/graphql';

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

const query = graphql`
  query presskitFeaturedSection {
    sanityPresskitPage {
      featuredSection {
        header
        articles {
          title
          author
          date
          href
          type
          image {
            image {
              asset {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const FeaturedSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityPresskitPage } = useStaticQuery<PresskitFeaturedSectionQuery>(query);
  const data = sanityPresskitPage?.featuredSection;

  const items: JSX.Element[] = (data?.articles || []).map(item => (
    <ArticleCard
      name={item?.title || ''}
      type={item?.type || 'article'}
      imgSrc={item?.image?.image?.asset?.url || ''}
      author={item?.author || ''}
      date={item?.date || ''}
      url={item?.href || ''}
    />
  ));

  return (
    <Section withSlider title={data?.header || ''} classes={{ title: styles.title }}>
      <ResponsiveSlider
        infinite={false}
        className={styles.slider}
        itemWidth="90%"
        slidesToShow={3}
        items={items}
      />
    </Section>
  );
};

export default FeaturedSection;
