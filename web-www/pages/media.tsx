import { Box, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import ArticleCard from 'web-components/src/components/cards/ArticleCard';
import SelectTextField from 'web-components/src/components/inputs/SelectTextField';
import Section from 'web-components/src/components/section';

import { MediaPageDocument, MediaPageQuery } from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';
import {
  getMediaCategories,
  getMediaGrouped,
} from '@/lib/utils/pages/Media.utils';
import { useMediaStyles } from '@/styles/pages/Media.styles';
import { DRAFT_TEXT } from '@/lib/constants/shared.constants';

export default function MediaPage({
  mediaPageData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { classes: styles } = useMediaStyles();
  const items = mediaPageData.data.allMedia ?? [];
  const types = Array.from(new Set(items.map(item => item.type)));
  const categories = getMediaCategories(types);
  const grouped = getMediaGrouped(items);

  return (
    <>
      <NextSeo title="Media" />
      <div className={styles.background}>
        <Section
          title="Media"
          titleVariant="h1"
          classes={{ root: styles.section, title: styles.title }}
        >
          <Formik
            initialValues={{
              category: 'all',
            }}
            onSubmit={() => {}}
          >
            {({ values }) => {
              const currentItems =
                values.category === 'all' ? items : grouped[values.category];
              return (
                <>
                  <Form className={styles.form}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <span className={styles.show}>show me:</span>
                      <Box
                        sx={theme => ({
                          display: 'flex',
                          width: { xs: '100%', sm: theme.spacing(67.5) },
                        })}
                      >
                        <Field
                          className={styles.select}
                          options={categories}
                          component={SelectTextField}
                          name="category"
                        />
                      </Box>
                    </Box>
                  </Form>
                  <Grid container spacing={6}>
                    {currentItems.map((item, i) => (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <ArticleCard
                          className={styles.card}
                          type={item?.type || 'article'}
                          play={item?.type === 'video'}
                          name={item?.title || ''}
                          author={item?.author || ''}
                          date={item.date}
                          url={item?.href || ''}
                          imgSrc={item?.image?.image?.asset?.url || ''}
                          draftText={DRAFT_TEXT}
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
}

export const getStaticProps = async () => {
  const mediaPageData = await sanityClient.query<MediaPageQuery>({
    query: MediaPageDocument,
  });

  return {
    props: {
      mediaPageData,
    },
  };
};
