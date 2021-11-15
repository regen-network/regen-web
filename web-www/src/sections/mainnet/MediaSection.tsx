import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import { Typography } from '@mui/material';

import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import Section from 'web-components/src/components/section';
import ArticleCard from 'web-components/lib/components/cards/ArticleCard';

type Item = {
  title: string;
  date: string;
  author: string;
  url: string;
  isMainnet: boolean;
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
            isMainnet
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
      .filter(item => item.isMainnet)
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

  return (
    <Section className={classes.root}>
      <div className={classes.main}>
        <ResponsiveSlider
          arrows
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          classes={{
            root: classes.slider,
            headerWrap: classes.headerWrap,
          }}
          slidesToShow={3}
          items={itemCards}
          renderTitle={() => (
            <Typography variant="h1" className={classes.title}>
              {header}
            </Typography>
          )}
        />
      </div>
    </Section>
  );
};

export default MediaSection;
