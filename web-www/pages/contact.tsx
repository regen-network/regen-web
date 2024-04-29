import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import cx from 'clsx';
import { Field, Form, Formik } from 'formik';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import Banner from 'web-components/src/components/banner';
import ErrorBanner from 'web-components/src/components/banner/ErrorBanner';
import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Card from 'web-components/src/components/cards/Card';
import SelectTextField from 'web-components/src/components/inputs/SelectTextField';
import TextField from 'web-components/src/components/inputs/TextField';
import {
  invalidEmailMessage,
  requiredMessage,
  validateEmail,
} from 'web-components/src/components/inputs/validation';
import Section from 'web-components/src/components/section';
import { Body, Title } from 'web-components/src/components/typography';

import SharedFaqSection from '@/components/templates/shared/SharedFaqSection/SharedFaqSection';
import {
  ContactPageDocument,
  ContactPageQuery,
} from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';
import { useContactStyles } from '@/styles/pages/Contact.styles';

interface Values {
  name: string;
  email: string;
  orgName?: string;
  requestType: string;
  message: string;
}

const bannerDuration: number = 5000;

export default function ContactPage({
  contactData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { classes: styles } = useContactStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const data = contactData.data.allContactPage[0];

  return (
    <>
      <NextSeo title="Contact" />
      <div className={styles.background}>
        <Section
          title={data?.header || ''}
          titleVariant="h1"
          classes={{ root: styles.section, title: styles.title }}
        >
          <Body
            as="div"
            size="xl"
            align="center"
            sx={{
              maxWidth: ['100%', 556],
              pb: [7.5, 10.5],
              m: { sm: '0 auto' },
            }}
          >
            <BlockContent content={data?.bodyRaw} />
          </Body>
          <Box sx={{ maxWidth: 700, m: '0 auto', pb: 32 }}>
            <Card elevation={1} className={styles.card}>
              <Formik
                initialValues={{
                  name: '',
                  orgName: '',
                  email: '',
                  requestType: '',
                  message: '',
                }}
                validate={(values: Values) => {
                  const errors: Partial<Values> = {};
                  if (!values.email) {
                    errors.email = requiredMessage;
                  } else if (!validateEmail(values.email)) {
                    errors.email = invalidEmailMessage;
                  }
                  if (!values.name) {
                    errors.name = requiredMessage;
                  }
                  if (!values.requestType) {
                    errors.requestType = requiredMessage;
                  }
                  if (!values.message) {
                    errors.message = requiredMessage;
                  }
                  return errors;
                }}
                onSubmit={(
                  { requestType, email, name, orgName, message },
                  { setSubmitting, resetForm, setStatus },
                ) => {
                  setSubmitting(true);
                  const apiUri: string =
                    process.env.NEXT_PUBLIC_API_URI || 'http://localhost:5000';
                  axios
                    .post(`${apiUri}/website/v1/contact`, {
                      email,
                      name,
                      orgName,
                      requestType,
                      message,
                    })
                    .then(resp => {
                      setStatus(null);
                      setSubmitting(false);
                      setTimeout(resetForm, bannerDuration);
                    })
                    .catch(e => {
                      setStatus({ serverError: e });
                      setSubmitting(false);
                    });
                }}
              >
                {({
                  values,
                  isValid,
                  submitForm,
                  isSubmitting,
                  submitCount,
                  status,
                }) => {
                  const hasBeenSubmitted = submitCount > 0 && !isSubmitting;
                  return (
                    <div>
                      <Form translate="yes">
                        <div>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: [0, 3.75] }}>
                              <Field
                                className={styles.textField}
                                component={TextField}
                                label="Your full name"
                                name="name"
                                forceDefaultStyle
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ pl: [0, 3.75] }}>
                              <Field
                                component={TextField}
                                className={styles.textField}
                                type="email"
                                label="Your email address"
                                name="email"
                                forceDefaultStyle
                              />
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: [0, 3.75] }}>
                              <Field
                                component={TextField}
                                className={styles.textField}
                                label="Your organization's name"
                                name="orgName"
                                optional
                                forceDefaultStyle
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ pl: [0, 3.75] }}>
                              <Field
                                options={[
                                  { value: '', label: 'Select one' },
                                  ...(data?.formRequestTypes as any),
                                ]}
                                component={SelectTextField}
                                label="I am a:"
                                name="requestType"
                                className={
                                  values.requestType === ''
                                    ? cx(styles.defaultSelect, styles.textField)
                                    : styles.textField
                                }
                                forceDefaultStyle
                              />
                            </Grid>
                          </Grid>
                        </div>
                        {values.requestType ===
                          'partnerships@regen.network' && (
                          <Body
                            as="div"
                            size="lg"
                            mobileSize="md"
                            color="primary.contrastText"
                            sx={{ mt: [7, 8.5] }}
                          >
                            <BlockContent
                              content={data?.messageForPartnersRaw}
                            />
                          </Body>
                        )}
                        <Field
                          component={TextField}
                          name="message"
                          className={cx(styles.textAreaField, styles.textField)}
                          label="Message"
                          multiline
                          rows={matches ? 6 : 4}
                          minRows={matches ? 6 : 4}
                        />
                        <ContainedButton
                          sx={{
                            mt: 12.5,
                            float: 'right',
                            width: [155, 262],
                          }}
                          disabled={
                            (submitCount > 0 && !isValid) || isSubmitting
                          }
                          size="large"
                          onClick={submitForm}
                        >
                          send
                        </ContainedButton>
                      </Form>
                      {hasBeenSubmitted && !status?.serverError && (
                        <Banner
                          duration={bannerDuration}
                          text="Your message was sent to the Regen team!"
                        />
                      )}
                      {hasBeenSubmitted && !!status?.serverError && (
                        <ErrorBanner
                          text={
                            status.serverError.message ||
                            'Sorry, something went wrong!'
                          }
                        />
                      )}
                    </div>
                  );
                }}
              </Formik>
            </Card>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ pr: [null, 5] }}>
                <Title variant="h4">{data?.location?.title}</Title>
                <Body as="div" size="lg" pt={2}>
                  <BlockContent content={data?.location?.bodyRaw} />
                </Body>
                <Title variant="h4" sx={{ pt: 8.5 }}>
                  {data?.email?.title}
                </Title>
                <Body as="div" size="lg" pt={2} pb={[5.75, 0]}>
                  <BlockContent content={data?.email?.bodyRaw} />
                </Body>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: `${data?.location?.image?.image?.asset?.metadata?.dimensions?.width} / ${data?.location?.image?.image?.asset?.metadata?.dimensions?.width}`,
                  }}
                >
                  <Image
                    src={String(data?.location?.image?.image?.asset?.url)}
                    alt={String(data?.location?.image?.image?.asset?.altText)}
                    fill
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Section>
        <SharedFaqSection
          header={data?.faq?.title || ''}
          imageData={String(data?.faq?.image?.image?.asset?.url)}
        />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const contactData = await sanityClient.query<ContactPageQuery>({
    query: ContactPageDocument,
  });

  return {
    props: {
      contactData,
    },
  };
};
