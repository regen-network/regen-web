import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/fund/TopSection';
import FoldSection from '../sections/fund/FoldSection';
import CallToAction from '../sections/fund/CallToAction';

const query = graphql`
  query {
    seoImage: file(relativePath: { eq: "waterfall.png" }) {
      publicURL
    }
    text: fundYaml {
      seo {
        title
        description
      }
    }
  }
`;

const FundPage = ({ location }: PageProps): JSX.Element => {
  const data = useStaticQuery(query);

  return (
    <>
      <SEO
        description={data?.text?.seo?.description}
        title={data?.text?.seo?.title}
        location={location}
        imageUrl={data?.seoImage?.publicURL}
      />
      <TopSection />
      <FoldSection />
      <CallToAction />
    </>
  );
};

export default FundPage;
