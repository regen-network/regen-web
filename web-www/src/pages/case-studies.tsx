import React from 'react';
import { PageProps } from 'gatsby';

import SEO from '../components/seo';
import ListSection from '../sections/case-studies/ListSection';
import TopSection from '../sections/case-studies/TopSection';

const CaseStudiesPage: React.FC<PageProps> = ({ location }) => {
  return (
    <>
      <SEO
        location={location}
        title="Case Studies"
        description="Explore Regen Network case studies where technology, science and regenerative land use practices intersect."
      />
      <TopSection />
      <ListSection />
    </>
  );
};

export default CaseStudiesPage;
