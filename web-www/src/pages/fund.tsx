import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import SEO from '../components/seo';
import { FundPageQuery } from '../generated/graphql';
import CallToAction from '../sections/fund/CallToAction';
import FoldSection from '../sections/fund/FoldSection';
import ThesisSection from '../sections/fund/ThesisSection';
import TopSection from '../sections/fund/TopSection';

const query = graphql`
  query fundPage {
    seoImage: file(relativePath: { eq: "waterfall.png" }) {
      publicURL
    }
    sanityFundPage {
      seoTitle
      seoDescription
    }
  }
`;

const FundPage: React.FC<PageProps> = ({ location }) => {
  const { seoImage, sanityFundPage: data } =
    useStaticQuery<FundPageQuery>(query);

  return (
    <>
      <SEO
        description={data?.seoDescription || ''}
        title={data?.seoTitle || ''}
        location={location}
        imageUrl={seoImage?.publicURL || ''}
      />
      <TopSection />
      <FoldSection />
      <ThesisSection />
      <CallToAction />
    </>
  );
};

export default FundPage;
