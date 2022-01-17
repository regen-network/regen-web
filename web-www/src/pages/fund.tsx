import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/fund/TopSection';
import FoldSection from '../sections/fund/FoldSection';
import ThesisSection from '../sections/fund/ThesisSection';
import CallToAction from '../sections/fund/CallToAction';
import { FundPageQuery } from '../generated/graphql';

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
  const { seoImage, sanityFundPage: data } = useStaticQuery<FundPageQuery>(query);

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
