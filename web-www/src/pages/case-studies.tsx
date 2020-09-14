import React from 'react';

import TopSection from '../sections/case-studies/TopSection';
import ListSection from '../sections/case-studies/ListSection';
import SEO from '../components/seo';

const CaseStudiesPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Case Studies" />
      <TopSection />
      <ListSection />
    </>
  );
};

export default CaseStudiesPage;
