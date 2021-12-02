import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import { useStaticQuery, graphql, PageProps } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import Img, { FluidObject } from 'gatsby-image';
import cx from 'clsx';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import SEO from '../components/seo';
import FAQSection from '../sections/shared/FAQSection';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import Card from 'web-components/lib/components/cards/Card';
import {
  requiredMessage,
  validateEmail,
  invalidEmailMessage,
} from 'web-components/lib/components/inputs/validation';
import TextField from 'web-components/lib/components/inputs/TextField';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { BlockContent } from 'web-components/src/components/block-content';
import Banner from 'web-components/lib/components/banner';

import { ContactPageQuery } from '../generated/graphql';

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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7.5),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2.5),
      fontSize: theme.spacing(8),
    },
  },
  subtitle: {
    '& p': {
      margin: 0,
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(10.5),
      maxWidth: theme.spacing(139),
      margin: '0 auto',
      fontSize: theme.spacing(5.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7.5),
      fontSize: theme.spacing(4.5),
    },
  },
  container: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(175.25),
      paddingBottom: theme.spacing(32),
      margin: '0 auto',
    },
  },
  email: {
    paddingTop: theme.spacing(8.5),
  },
  body: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  emailBody: {
    lineHeight: '200%',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(5.75),
    },
  },
  card: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(13.75)} ${theme.spacing(7.5)} ${theme.spacing(12.75)}`,
      marginBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(9.5)} ${theme.spacing(5)} ${theme.spacing(11.25)}`,
      marginBottom: theme.spacing(16.25),
    },
  },
  textField: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(10.75),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8.25),
    },
    '& .MuiInputBase-root': {
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
        height: theme.spacing(25),
      },
    },
  },
  button: {
    float: 'right',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(15),
      width: theme.spacing(65.5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(12.5),
      width: theme.spacing(38.75),
    },
  },
  gridLeft: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3.75),
    },
  },
  gridRight: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3.75),
    },
  },
  defaultSelect: {
    '& .MuiInputBase-root': {
      color: theme.palette.info.main,
    },
  },
  messageForPartners: {
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(-8.5),
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(-7),
      fontSize: theme.spacing(4),
    },
  },
  contactInfo: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(5),
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
          <Description align="center" className={styles.subtitle}>
            <BlockContent content={data?._rawBody} />
          </Description>
          <div className={styles.container}>
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
                onSubmit={({ requestType, email, name, orgName, message }, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  const apiUri: string = process.env.GATSBY_API_URI || 'http://localhost:5000';
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
                {({ values, isValid, submitForm, isSubmitting, submitCount }) => {
                  return (
                    <div>
                      <Form translate="yes">
                        <div>
                          <Grid container>
                            <Grid item xs={12} sm={6} className={styles.gridLeft}>
                              <Field
                                className={styles.textField}
                                component={TextField}
                                label="Your full name"
                                name="name"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} className={styles.gridRight}>
                              <Field
                                component={TextField}
                                className={styles.textField}
                                type="email"
                                label="Your email address"
                                name="email"
                              />
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6} className={styles.gridLeft}>
                              <Field
                                component={TextField}
                                className={styles.textField}
                                label="Your organization's name"
                                name="orgName"
                                optional
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} className={styles.gridRight}>
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
                              />
                            </Grid>
                          </Grid>
                        </div>
                        {values.requestType === 'partnerships@regen.network' && (
                          <Description className={styles.messageForPartners}>
                            <BlockContent content={data?._rawMessageForPartners} />
                          </Description>
                        )}
                        <Field
                          component={TextField}
                          name="message"
                          className={cx(styles.textAreaField, styles.textField)}
                          label="Message"
                          multiline
                          rows={matches ? 6 : 4}
                        />
                        <ContainedButton
                          disabled={(submitCount > 0 && !isValid) || isSubmitting}
                          className={styles.button}
                          onClick={submitForm}
                        >
                          send
                        </ContainedButton>
                      </Form>
                      {submitCount > 0 && !isSubmitting && (
                        <Banner duration={bannerDuration} text="Your message was sent to the Regen team!" />
                      )}
                    </div>
                  );
                }}
              </Formik>
            </Card>
            <Grid container>
              <Grid item xs={12} sm={6} className={styles.contactInfo}>
                <Title variant="h4">{data?.location?.title}</Title>
                <Description className={styles.body}>
                  <BlockContent content={data?.location?._rawBody} />
                </Description>
                <Title className={styles.email} variant="h4">
                  {data?.email?.title}
                </Title>
                <Description className={cx(styles.emailBody, styles.body)}>
                  <BlockContent content={data?.email?._rawBody} />
                </Description>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Img fluid={data?.location?.image?.image?.asset?.fluid as FluidObject} />
              </Grid>
            </Grid>
          </div>
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
