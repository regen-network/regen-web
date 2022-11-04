import React from 'react';
import { makeStyles } from '@mui/styles';
import ArticleCard from '@regen-network/web-components/lib/components/cards/ArticleCard';
import Section from '@regen-network/web-components/lib/components/section';
import ResponsiveSlider from '@regen-network/web-components/lib/components/sliders/ResponsiveSlider';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import { PresskitFeaturedSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(8),
    },
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(20),
    },
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        height: 'inherit',
        [theme.breakpoints.down('sm')]: {
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
  const { sanityPresskitPage } =
    useStaticQuery<PresskitFeaturedSectionQuery>(query);
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
    <Section
      withSlider
      title={data?.header || ''}
      classes={{ title: styles.title }}
    >
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
