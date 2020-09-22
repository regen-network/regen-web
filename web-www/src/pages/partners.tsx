import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Section from 'web-components/lib/components/section';
import GreenCard from 'web-components/lib/components/cards/GreenCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Title from 'web-components/lib/components/title';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
      paddingBottom: theme.spacing(23),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(24.5),
      paddingBottom: theme.spacing(15),
    },
    backgroundColor: theme.palette.grey[50],
    overflow: 'hidden',
  },
  item: {
    width: theme.spacing(90.25),
    height: theme.spacing(62.5),
    textAlign: 'center',
    paddingRight: theme.spacing(3.6),
    paddingBottom: theme.spacing(5.25),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderTop: '10px #7BC796 solid',
    width: '100%',
    height: '100%',
    padding: 'inherit',
    borderLeft: `0.5px ${theme.palette.grey[100]} solid`,
    borderRight: `0.5px ${theme.palette.grey[100]} solid`,
    borderBottom: `0.5px ${theme.palette.grey[100]} solid`,
  },
  img: {
    maxHeight: '90%',
    maxWidth: '80%',
  },
  contactCard: {
    '& h4.MuiTypography-root, p.MuiTypography-root': {
      color: theme.palette.info.dark,
    },
    backgroundColor: theme.palette.info.light,
    padding: theme.spacing(4.5),
    borderTop: `10px ${theme.palette.secondary.contrastText} solid`,
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
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(21.75),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(10.25),
    },
  },
}));

const PartnersPage = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      allPartnersYaml(sort: { order: ASC }) {
        edges {
          node {
            partnerLogos {
              image
              link
              sortOrder
            }
          }
        }
      }
    }
  `);
  const partners = data.allPartnersYaml.edges[0].node.partnerLogos;
  const classes = useStyles();
  return (
    <>
      <SEO title="Partners" />
      <Section className={classes.section}>
        <Title className={classes.title} align="center" variant="h1">
          Our Partners
        </Title>
        <Grid spacing={7} justify="center" direction="row" alignItems="center" container>
          {partners.map((partner: any) => (
            <Grid className={classes.item} xs={12} sm={4} item key={partner.sortOrder}>
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                <GreenCard className={classes.card}>
                  {partner.image ? (
                    <img className={classes.img} src={partner.image} alt={partner.image} />
                  ) : (
                    ''
                  )}
                </GreenCard>
              </a>
            </Grid>
          ))}
          <Grid className={classes.item} xs={12} sm={6} md={4} item key={'contact'}>
            <GreenCard className={clsx(classes.card, classes.contactCard)}>
              <Title align="center" variant="h4">
                Your Organization?
              </Title>
              <Typography className={classes.contactText}>
                Contact us at <a href="mailto:office@regen.network">office@regen.network</a> about partnership
                opportunities.
              </Typography>
            </GreenCard>
          </Grid>
        </Grid>
      </Section>
    </>
  );
};

export default PartnersPage;
