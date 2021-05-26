import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/seo';
import TopSection from '../sections/token/TopSection';
import TokenEconomics from '../sections/token/TokenEconomics';
import Info from '../sections/token/InfoSection';
import TokenPool from '../sections/token/TokenPool';
import UnlockSchedule from '../sections/token/UnlockSchedule';
import Staking from '../sections/token/Staking';
import BlockExplorerSection from '../sections/token/BlockExplorerSection';
import ConnectSection from '../sections/token/ConnectSection';
import MediaSection from '../sections/token/MediaSection';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';

interface Props {
  location: Location;
}

const TokenPage = ({ location }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "token-aurora.png" }) {
        publicURL
      }
      emailImage: file(relativePath: { eq: "deer-newsletter-bg.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      text: tokenYaml {
        newsletterSection {
          header
          buttonText
          inputText
        }
      }
    }
  `);
  const newsletterContent = data?.text?.newsletterSection;
  console.log('newsletterContent', newsletterContent);

  return (
    <>
      <SEO
        description="REGEN token is a utility token powering an application specific blockchain for global climate finance. "
        title="REGEN Token"
        location={location}
        imageUrl={data?.seoImage?.publicURL}
      />
      <TopSection />
      <TokenEconomics />
      <Info />
      <TokenPool />
      <UnlockSchedule />
      <BlockExplorerSection />
      <Staking />
      <ConnectSection />
      <MediaSection />
      <EmailSubmitSection
        image={data?.emailImage?.childImageSharp?.fluid}
        altContent={{
          header: newsletterContent?.header,
          buttonText: newsletterContent?.buttonText,
          inputText: newsletterContent?.inputText,
        }}
      />
    </>
  );
};

export default TokenPage;
