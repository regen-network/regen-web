import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import TopSection from '../sections/invest/TopSection';
import FormSection from '../sections/invest/FormSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const InvestorsPage = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "investors-top.jpg" }) {
        publicURL
      }
    }
  `);
  return (
    <>
      <SEO
        description="Learn about investment opportunities at Regen Network."
        title="Invest"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection />
      <FormSection />
    </>
  );
};

export default InvestorsPage;
