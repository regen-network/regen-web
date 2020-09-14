import React from 'react';

import TopSection from '../sections/invest/TopSection';
import FormSection from '../sections/invest/FormSection';
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
