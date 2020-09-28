import React from 'react';

import TopSection from '../sections/invest/TopSection';
import FormSection from '../sections/invest/FormSection';
import SEO from '../components/seo';

interface props {
  location: object;
}

const InvestorsPage = ({ location }: props): JSX.Element => {
  return (
    <>
      <SEO
        description="Learn about investment opportunities at Regen Network."
        title="Invest"
        location={location}
      />
      <TopSection />
      <FormSection />
    </>
  );
};

export default InvestorsPage;
