import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import SEO from '../components/seo';
import { TokenPageQuery } from '../generated/graphql';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';
import BlockExplorerSection from '../sections/token/BlockExplorerSection';
import ConnectSection from '../sections/token/ConnectSection';
import InfoSection from '../sections/token/InfoSection';
import MediaSection from '../sections/token/MediaSection';
import Staking from '../sections/token/Staking';
import TokenDetails from '../sections/token/TokenDetails';
import TokenEconomics from '../sections/token/TokenEconomics';
import TopSection from '../sections/token/TopSection';

const query = graphql`
  query tokenPage {
    seoImage: file(relativePath: { eq: "token-aurora.png" }) {
      publicURL
    }
    emailImage: file(relativePath: { eq: "deer-newsletter-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    sanityTokenPage {
      topSection {
        title
        body
      }
      newsletterSection {
        header
        buttonText
        inputText
      }
    }
  }
`;

const TokenPage = ({ location }: PageProps): JSX.Element => {
  const { emailImage, seoImage, sanityTokenPage } =
    useStaticQuery<TokenPageQuery>(query);
  const data = sanityTokenPage?.topSection;
  const newsletterContent = sanityTokenPage?.newsletterSection;

  return (
    <>
      <SEO
        description={data?.body || ''}
        title={data?.title || ''}
        location={location}
        imageUrl={seoImage?.publicURL || ''}
      />
      <TopSection />
      <TokenEconomics />
      <InfoSection />
      <TokenDetails />
      <BlockExplorerSection />
      <Staking />
      <ConnectSection />
      <MediaSection />
      <EmailSubmitSection
        image={emailImage?.childImageSharp?.fluid as FluidObject}
        altContent={{
          header: newsletterContent?.header || '',
          buttonText: newsletterContent?.buttonText || '',
          inputText: newsletterContent?.inputText || '',
        }}
      />
    </>
  );
};

export default TokenPage;
