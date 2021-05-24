import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useStaticQuery, graphql } from 'gatsby';
import { Formik, Form, Field } from 'formik';

import SEO from '../components/seo';
import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import Section from 'web-components/lib/components/section';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';

interface props {
  location: Location;
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.grey[50],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
      paddingBottom: theme.spacing(40.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(22.5),
      paddingTop: theme.spacing(7.5),
    },
  },
  card: {
    height: '100%',
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(13.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7.5),
      fontSize: theme.spacing(8),
    },
  },
  show: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
    fontSize: theme.spacing(3),
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(5.75),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(3),
    },
  },
  select: {
    '& .MuiInputBase-root': {
      fontSize: theme.spacing(3.5),
      height: theme.spacing(12.5),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(67.5),
    },
  },
}));

interface Item {
  title: string;
  date: string;
  author: string;
  url: string;
  image: {
    publicURL: string;
  };
}

interface ItemWithCategory extends Item {
  category: string;
  buttonText: string;
  showPlay: boolean;
}

interface Category {
  name: string;
  buttonText: string;
  showPlay: boolean;
  items: Item[];
}

const MediaPage = ({ location }: props): JSX.Element => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
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
            image {
              publicURL
            }
          }
        }
      }
    }
  `);
  const content = data.text;
  const categories: Option[] = content.categories.map((c: Category) => ({
    value: c.name,
    label: c.name.charAt(0).toUpperCase() + c.name.slice(1),
  }));
  categories.unshift({
    value: 'all',
    label: 'All',
  });

  return (
    <>
      <SEO title="Media" location={location} />
      <div className={classes.background}>
        <Section
          title={content.header}
          titleVariant="h1"
          classes={{ root: classes.section, title: classes.title }}
        >
          <Formik
            initialValues={{
              category: 'all',
            }}
            onSubmit={() => {}}
          >
            {({ values }) => {
              const category: Category | undefined = content.categories.find(
                (c: Category) => c.name === values.category,
              );
              return (
                <>
                  <Form>
                    <Grid container wrap="nowrap" alignItems="center">
                      <span className={classes.show}>show me:</span>
                      <Field
                        className={classes.select}
                        options={categories}
                        component={SelectTextField}
                        name="category"
                      />
                    </Grid>
                  </Form>
                  <Grid container spacing={6}>
                    {values.category !== 'all'
                      ? content.categories
                          .find((c: Category) => c.name === values.category)
                          .items.map((item: Item, index: number) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <ArticleCard
                                className={classes.card}
                                buttonText={category && category.buttonText}
                                play={category && category.showPlay}
                                name={item.title}
                                author={item.author}
                                date={item.date}
                                url={item.url}
                                imgSrc={item.image.publicURL}
                              />
                            </Grid>
                          ))
                      : content.categories
                          .map((c: Category) =>
                            c.items.map((i: Item) => ({
                              buttonText: c.buttonText,
                              showPlay: c.showPlay,
                              category: c.name,
                              ...i,
                            })),
                          )
                          .flat()
                          .sort((a: Item, b: Item) => new Date(b.date) - new Date(a.date))
                          .map((item: ItemWithCategory, index: number) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <ArticleCard
                                className={classes.card}
                                buttonText={item.buttonText}
                                play={item.showPlay}
                                name={item.title}
                                author={item.author}
                                date={item.date}
                                url={item.url}
                                imgSrc={item.image.publicURL}
                              />
                            </Grid>
                          ))}
                  </Grid>
                </>
              );
            }}
          </Formik>
        </Section>
      </div>
    </>
  );
};

export default MediaPage;
