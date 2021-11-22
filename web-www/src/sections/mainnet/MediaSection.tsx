import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme, Typography, useTheme } from '@material-ui/core';

import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import Section from 'web-components/src/components/section';
import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import { MainnetMediaSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 4, 20),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(10, 0, 20),
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontSize: theme.spacing(10),
    fontWeight: 900,
  },
  headerWrap: {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  slider: {
    padding: theme.spacing(4),
  },
  card: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
  },
}));

const query = graphql`
  query mainnetMediaSection {
    sanityMainnetPage {
      mediaItems {
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
`;

const MediaSection: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles();
  const { sanityMainnetPage } = useStaticQuery<MainnetMediaSectionQuery>(query);
  const items = sanityMainnetPage?.mediaItems;
  const itemCards: JSX.Element[] = (items || []).map((item, i) => (
    <ArticleCard
      className={styles.card}
      key={i}
      type={item?.type || ''}
      url={item?.href || ''}
      name={item?.title || ''}
      author={item?.author || ''}
      imgSrc={item?.image?.image?.asset?.url || ''}
      date={item?.date}
      play={item?.type === 'video'}
    />
  ));

  return (
    <Section className={styles.root}>
      <div className={styles.main}>
        <ResponsiveSlider
          arrows
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          classes={{
            root: styles.slider,
            headerWrap: styles.headerWrap,
          }}
          slidesToShow={3}
          items={itemCards}
          renderTitle={() => (
            <Typography variant="h1" className={styles.title}>
              Media
            </Typography>
          )}
        />
      </div>
    </Section>
  );
};

export default MediaSection;
