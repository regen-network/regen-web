import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Section from 'web-components/lib/components/section';
import PartnerCard from 'web-components/lib/components/cards/PartnerCard';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    padding: 0,
    overflow: 'hidden',
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
        {partners.map((partner: any) => (
          <PartnerCard key={partner.sortOrder} sortOrder={partner.sortOrder} imageUrl={partner.image} />
        ))}
      </Section>
    </>
  );
};

export default PartnersPage;
