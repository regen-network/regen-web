import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import Title from 'web-components/lib/components/title';
import GreenMediaCard from 'web-components/lib/components/cards/GreenMediaCard';
import GreenCard from 'web-components/lib/components/cards/GreenCard';
import Section from 'web-components/lib/components/section';
import SEO from '../components/seo';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
      paddingBottom: theme.spacing(40.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(22.5),
      paddingTop: theme.spacing(9.5),
    },
    backgroundColor: theme.palette.grey[50],
    overflow: 'hidden',
  },
  sectionWrapper: {
    width: '100%',
    backgroundColor: theme.palette.grey[50],
  },
  item: {
    width: theme.spacing(90.25),
    height: theme.spacing(62.5),
    textAlign: 'center',
    paddingRight: theme.spacing(3.6),
    paddingBottom: theme.spacing(5.25),
  },
  card: {
    '& img': {
      padding: theme.spacing(7.5),
    },
  },
  contactCard: {
    '& h4.MuiTypography-root, p.MuiTypography-root': {
      color: theme.palette.info.dark,
    },
    backgroundColor: theme.palette.info.light,
    padding: theme.spacing(4.5),
    borderTop: `10px ${theme.palette.secondary.contrastText} solid`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderLeft: `0.5px ${theme.palette.grey[100]} solid`,
    borderRight: `0.5px ${theme.palette.grey[100]} solid`,
    borderBottom: `0.5px ${theme.palette.grey[100]} solid`,
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
  contactText: {
    fontSize: theme.spacing(4.5),
    paddingTop: theme.spacing(3.25),
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(10.25),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(21.75),
    },
  },
}));

interface props {
  location: object;
}

const PartnersPage = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      allPartnersYaml(sort: { order: ASC }) {
        edges {
          node {
            header
            partnerLogos {
              image {
                publicURL
              }
              link
            }
            contactCard {
              header
              body
            }
          }
        }
      }
    }
  `);
  const partners = data.allPartnersYaml.edges[0].node.partnerLogos;
  const header = data.allPartnersYaml.edges[0].node.header;
  const contactCard = data.allPartnersYaml.edges[0].node.contactCard;
  const classes = useStyles();
  return (
    <>
      <SEO title="Partners" location={location} />
      <div className={classes.sectionWrapper}>
        <Section className={classes.section}>
          <Title className={classes.title} align="center" variant="h1">
            {header}
          </Title>
          <Grid spacing={7} justify="center" direction="row" alignItems="center" container>
            {partners.map((partner: any, i: number) => (
              <Grid className={classes.item} xs={12} sm={4} item key={i}>
                <GreenMediaCard
                  className={classes.card}
                  imageUrl={partner.image.publicURL}
                  link={partner.link}
                />
              </Grid>
            ))}
            <Grid className={classes.item} xs={12} sm={6} md={4} item key="contact">
              <GreenCard className={clsx(classes.card, classes.contactCard)}>
                <Title align="center" variant="h4">
                  {contactCard.header}
                </Title>
                <Typography className={classes.contactText}>{ReactHtmlParser(contactCard.body)}</Typography>
              </GreenCard>
            </Grid>
          </Grid>
        </Section>
      </div>
    </>
  );
};

export default PartnersPage;
