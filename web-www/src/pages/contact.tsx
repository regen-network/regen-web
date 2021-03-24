import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import Img from 'gatsby-image';
import clsx from 'clsx';
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
import Banner from 'web-components/lib/components/banner';

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
  headquarters: {
    fontWeight: 'bold',
    margin: 0,
  },
  email: {
    paddingTop: theme.spacing(8.5),
  },
  headquartersBody: {
    '& p': {
      margin: 0,
    },
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
}));

const ContactPage = ({ location }: { location: object }): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const data = useStaticQuery(graphql`
    query {
      text: contactYaml {
        header
        body
        form {
          messageForPartners
          requestTypes {
            label
            value
          }
        }
        location {
          header
          body
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        headquarters {
          header
          body
        }
        email {
          header
          body
        }
        faq {
          header
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);
  const content = data.text;

  return (
    <>
      <SEO title="Contact" location={location} />
      <div className={classes.background}>
        <Section
          title={content.header}
          titleVariant="h1"
          className={classes.section}
          titleClassName={classes.title}
        >
          <Description align="center" className={classes.subtitle}>
            {ReactHtmlParser(content.body)}
          </Description>
          <div className={classes.container}>
            <Card elevation={1} className={classes.card}>
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
                            <Grid item xs={12} sm={6} className={classes.gridLeft}>
                              <Field
                                className={classes.textField}
                                component={TextField}
                                label="Your full name"
                                name="name"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.gridRight}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                type="email"
                                label="Your email address"
                                name="email"
                              />
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6} className={classes.gridLeft}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                label="Your organization's name"
                                name="orgName"
                                optional
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.gridRight}>
                              <Field
                                options={[{ value: '', label: 'Select one' }, ...content.form.requestTypes]}
                                component={SelectTextField}
                                label="I am a:"
                                name="requestType"
                                className={
                                  values.requestType === ''
                                    ? clsx(classes.defaultSelect, classes.textField)
                                    : classes.textField
                                }
                              />
                            </Grid>
                          </Grid>
                        </div>
                        {values.requestType === 'partnerships@regen.network' && (
                          <Description className={classes.messageForPartners}>
                            {ReactHtmlParser(content.form.messageForPartners)}
                          </Description>
                        )}
                        <Field
                          component={TextField}
                          name="message"
                          className={clsx(classes.textAreaField, classes.textField)}
                          label="Message"
                          multiline
                          rows={matches ? 6 : 4}
                        />
                        <ContainedButton
                          disabled={(submitCount > 0 && !isValid) || isSubmitting}
                          className={classes.button}
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
              <Grid item xs={12} sm={6}>
                <Title variant="h4">{content.location.header}</Title>
                <Description className={classes.body}>{ReactHtmlParser(content.location.body)}</Description>
                <Description className={classes.headquarters}>{content.headquarters.header}:</Description>
                <Description className={classes.headquartersBody}>
                  {ReactHtmlParser(content.headquarters.body)}
                </Description>
                <Title className={classes.email} variant="h4">
                  {content.email.header}
                </Title>
                <Description className={clsx(classes.emailBody, classes.body)}>
                  {ReactHtmlParser(content.email.body)}
                </Description>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Img fluid={content.location.image.childImageSharp.fluid} />
              </Grid>
            </Grid>
          </div>
        </Section>
        <FAQSection header={content.faq.header} imageData={content.faq.image.childImageSharp.fluid} />
      </div>
    </>
  );
};

export default ContactPage;
