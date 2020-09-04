import React from 'react';

import TopSection from '../sections/investors/TopSection';
import FormSection from '../sections/investors/FormSection';
import SEO from '../components/seo';

const InvestorsPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Invest" />
      <TopSection />
      <FormSection />
    </>
  );
};

export default InvestorsPage;
