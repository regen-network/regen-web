import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useStaticQuery, graphql, PageProps } from 'gatsby';
import { Formik, Form, Field } from 'formik';

import SEO from '../components/seo';
import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import Section from 'web-components/lib/components/section';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';
import { MediaPageQuery, SanityMedia } from '../generated/graphql';

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

type ItemMap = {
  [type: string]: SanityMedia[];
};

const query = graphql`
  query mediaPage {
    allSanityMedia {
      nodes {
        title
        author
        date
        type
        href
        author
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

const uppercase = (str: string | null) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const MediaPage: React.FC<PageProps> = ({ location }) => {
  const styles = useStyles();

  const { allSanityMedia } = useStaticQuery<MediaPageQuery>(query);
  const items = allSanityMedia?.nodes || [];
  const types = Array.from(new Set(items.map(item => item.type)));

  const categories = types.map(c => ({
    value: c,
    label: uppercase(c),
  }));

  const grouped: ItemMap = items
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce((acc: ItemMap, item) => {
      const type = item.type || 'all';
      if (acc[type]) {
        acc[type].push(item as SanityMedia);
      } else {
        acc[type] = [item as SanityMedia];
      }
      return acc;
    }, {});

  categories.unshift({
    value: 'all',
    label: 'All',
  });

  return (
    <>
      <SEO title="Media" location={location} />
      <div className={styles.background}>
        <Section title="Media" titleVariant="h1" classes={{ root: styles.section, title: styles.title }}>
          <Formik
            initialValues={{
              category: 'all',
            }}
            onSubmit={() => {}}
          >
            {({ values }) => {
              const currItems = values.category === 'all' ? items : grouped[values.category];
              return (
                <>
                  <Form>
                    <Grid container wrap="nowrap" alignItems="center">
                      <span className={styles.show}>show me:</span>
                      <Field
                        className={styles.select}
                        options={categories}
                        component={SelectTextField}
                        name="category"
                      />
                    </Grid>
                  </Form>
                  <Grid container spacing={6}>
                    {currItems.map((item, i) => (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <ArticleCard
                          className={styles.card}
                          type={item?.type}
                          play={item?.type === 'video'}
                          name={item?.title || ''}
                          author={item?.author || ''}
                          date={item.date}
                          url={item?.href || ''}
                          imgSrc={item?.image?.image?.asset?.url || ''}
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
