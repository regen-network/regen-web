import React from 'react';

import TopSection from '../sections/case-studies/TopSection';
import ListSection from '../sections/case-studies/ListSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const CaseStudiesPage = ({ location }: props): JSX.Element => {
  return (
    <>
      <SEO location={location} title="Case Studies" />
      <TopSection />
      <ListSection />
    </>
  );
};

export default CaseStudiesPage;
