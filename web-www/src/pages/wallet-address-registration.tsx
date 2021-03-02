import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/seo';
import TopSection from '../sections/wallet-address-registration/TopSection';
import InstructionsSection from '../sections/wallet-address-registration/InstructionsSection';
import FormSection from '../sections/wallet-address-registration/FormSection';
interface LocationProps extends Location {
  state?: {
    submitted: boolean;
  };
}
interface Props {
  location: LocationProps;
}

const WalletAddressRegistrationPage = ({ location }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "wallet-address-registration.png" }) {
        publicURL
      }
    }
  `);

  return (
    <>
      <SEO
        description="Register a valid Regen Network wallet address in order for your tokens to be allocated."
        title="Wallet Address Registration"
        location={location}
        imageUrl={data?.seoImage?.publicURL}
      />
      <TopSection />
      <InstructionsSection />
      <FormSection />
    </>
  );
};

export default WalletAddressRegistrationPage;
