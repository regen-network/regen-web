import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Banner from '@regen-network/web-components/lib/components/banner';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import Card from '@regen-network/web-components/lib/components/cards/Card';
import SelectTextField from '@regen-network/web-components/lib/components/inputs/SelectTextField';
import TextField from '@regen-network/web-components/lib/components/inputs/TextField';
import {
  invalidEmailMessage,
  requiredMessage,
  validateEmail,
} from '@regen-network/web-components/lib/components/inputs/validation';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import axios from 'axios';
import cx from 'clsx';
import { Field, Form, Formik } from 'formik';
import { graphql, PageProps, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import SEO from '../components/seo';
import type { ContactPageQuery } from '../generated/graphql';
import FAQSection from '../sections/shared/FAQSection';

interface Values {
  name: string;
  email: string;
  orgName?: string;
  requestType: string;
  message: string;
}

const bannerDuration: number = 5000;

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.grey[200],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.5),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2.5),
      fontSize: theme.spacing(8),
    },
  },
  container: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(175.25),
      paddingBottom: theme.spacing(32),
      margin: '0 auto',
    },
  },
  card: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(13.75, 7.5, 12.75),
      marginBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(9.5, 5, 11.25),
      marginBottom: theme.spacing(16.25),
    },
  },
  textField: {
    '& .MuiInputBase-root': {
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
  textAreaField: {
    '& .MuiInputBase-root': {
      overflow: 'hidden',
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(43.75),
      },
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(25),
      },
    },
  },
  defaultSelect: {
    '& .MuiInputBase-root': {
      color: theme.palette.info.main,
    },
  },
}));

const query = graphql`
  query contactPage {
    sanityContactPage {
      header
      _rawBody
      _rawMessageForPartners
      formRequestTypes {
        label
        value
      }
      location {
        title
        _rawBody
        image {
          ...fluidCustomImageFields
        }
      }
      email {
        title
        _rawBody
      }
      faq {
        title
        image {
          ...fluidCustomImageFields
        }
      }
    }
  }
`;

const ContactPage: React.FC<PageProps> = ({ location }) => {
  const styles = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const { sanityContactPage: data } = useStaticQuery<ContactPageQuery>(query);

  return (
    <>
      <SEO title="Contact" location={location} />
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
            <BlockContent content={data?._rawBody} />
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
                  { setSubmitting, resetForm },
                ) => {
                  setSubmitting(true);
                  const apiUri: string =
                    process.env.GATSBY_API_URI || 'http://localhost:5000';
                  axios
                    .post(`${apiUri}/contact`, {
                      email,
                      name,
                      orgName,
                      requestType,
                      message,
                    })
                    .then(resp => {
                      setSubmitting(false);
                      setTimeout(resetForm, bannerDuration);
                    })
                    .catch(e => {
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
                }) => {
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
                              content={data?._rawMessageForPartners}
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
                      {submitCount > 0 && !isSubmitting && (
                        <Banner
                          duration={bannerDuration}
                          text="Your message was sent to the Regen team!"
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
                  <BlockContent content={data?.location?._rawBody} />
                </Body>
                <Title variant="h4" sx={{ pt: 8.5 }}>
                  {data?.email?.title}
                </Title>
                <Body as="div" size="lg" pt={2} pb={[5.75, 0]}>
                  <BlockContent content={data?.email?._rawBody} />
                </Body>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Img
                  fluid={
                    data?.location?.image?.image?.asset?.fluid as FluidObject
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Section>
        <FAQSection
          header={data?.faq?.title || ''}
          imageData={data?.faq?.image?.image?.asset?.fluid as FluidObject}
        />
      </div>
    </>
  );
};

export default ContactPage;
