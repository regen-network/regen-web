import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import Img from 'gatsby-image';
import clsx from 'clsx';

import SEO from '../components/seo';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.grey[200],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
      // paddingBottom: theme.spacing(40.5),
    },
    [theme.breakpoints.down('xs')]: {
      // paddingBottom: theme.spacing(22.5),
      paddingTop: theme.spacing(5),
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
  description: {
    '& p': {
      margin: 0,
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(10.5),
      fontSize: theme.spacing(5.5),
      maxWidth: theme.spacing(139),
      margin: '0 auto',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(11),
      fontSize: theme.spacing(4.5),
    },
  },
  container: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(175.25),
      paddingBottom: theme.spacing(32),
      margin: '0 auto',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(25),
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
}));

const ContactPage = ({ location }: { location: object }): JSX.Element => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query {
      text: contactYaml {
        header
        body
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
          <Description align="center" className={classes.description}>
            {ReactHtmlParser(content.body)}
          </Description>
          <div className={classes.container}>
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
      </div>
    </>
  );
};

export default ContactPage;
