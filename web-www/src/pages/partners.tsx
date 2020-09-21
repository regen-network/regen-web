import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Section from 'web-components/lib/components/section';
import PartnerCard from 'web-components/lib/components/cards/PartnerCard';
import Grid from '@material-ui/core/Grid';
import Title from 'web-components/lib/components/title';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    paddingTop: theme.spacing(42.25),
    paddingBottom: theme.spacing(23),
    overflow: 'hidden',
  },
  item: {
    width: theme.spacing(361 / 4),
    height: theme.spacing(250 / 4),
    textAlign: 'center',
    paddingRight: theme.spacing(3.6),
    paddingBottom: theme.spacing(5.25),
  },
  card: {
    borderTop: '10px #7BC796 solid',
    width: '100%',
    height: '100%',
    border: `0.5px ${theme.palette.grey[100]} solid`,
  },
  title: {
    paddingBottom: theme.spacing(21.75),
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
            <Grid className={classes.item} xs={12} sm={6} md={4} item key={partner.sortOrder}>
              <PartnerCard className={classes.card} sortOrder={partner.sortOrder} imageUrl={partner.image} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default PartnersPage;
