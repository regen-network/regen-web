import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme, useTheme } from '@material-ui/core';

import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import Section from 'web-components/src/components/section';
import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import Title from 'web-components/lib/components/title';

type Item = {
  title: string;
  date: string;
  author: string;
  url: string;
  isTokenSale: boolean;
  image: {
    publicURL: string;
  };
};

type Category = {
  name: string;
  buttonText: string;
  showPlay: boolean;
  items: Item[];
};

type QueryData = {
  text: {
    header: string;
    categories: Category[];
  };
};

type CardItem = Item & {
  showPlay: boolean;
  buttonText: string;
  type: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(14, 4, 20),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(14, 0, 20),
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
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

const MediaSection: React.FC = () => {
  const {
    text: { header, categories },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: mediaYaml {
        header
        categories {
          name
          buttonText
          showPlay
          items {
            title
            date
            author
            url
            isTokenSale
            image {
              publicURL
            }
          }
        }
      }
    }
  `);
  const classes = useStyles();
  const theme = useTheme();
  const allItems: CardItem[] = categories.reduce((prev: CardItem[], curr) => {
    const { showPlay, buttonText, name } = curr;
    const items = curr.items
      .filter(item => item.isTokenSale)
      .map(item => ({ ...item, showPlay, buttonText, type: name }));
    return prev.concat(items);
  }, []);

  const itemCards: JSX.Element[] = allItems.map((item, i) => (
    <ArticleCard
      className={classes.card}
      key={i}
      url={item.url}
      name={item.title}
      author={item.author}
      buttonText={item.buttonText}
      imgSrc={item.image.publicURL}
      date={item.date}
      play={item.type === 'videos'}
    />
  ));
  const slidesToShow = itemCards && itemCards.length < 3 ? itemCards.length : 3;

  return (
    <Section className={classes.root}>
      <div className={classes.main}>
        {slidesToShow > 0 && (
          <ResponsiveSlider
            arrows
            itemWidth="90%"
            padding={theme.spacing(2.5)}
            className={classes.slider}
            headerWrapClassName={classes.headerWrap}
            slidesToShow={slidesToShow}
            items={itemCards}
            renderTitle={() => <Title className={classes.title}>{header}</Title>}
          />
        )}
      </div>
    </Section>
  );
};

export default MediaSection;
