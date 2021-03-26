import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/mainnet/TopSection';
import LaunchInfoSection from '../sections/mainnet/LaunchInfoSection';
import WhatsNextSection from '../sections/mainnet/WhatsNextSection';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import MediaSection from '../sections/mainnet/MediaSection';

interface Props extends PageProps {}

type QueryData = {
  background: {
    publicURL: string;
  };
  text: {
    seoDescription: string;
    livecastLink: string;
    launchDate: string;
  };
};

const Mainnet: React.FC<PageProps> = ({ location }) => {
  const {
    background,
    text: { livecastLink, launchDate, seoDescription },
  } = useStaticQuery<QueryData>(graphql`
    query {
      background: file(relativePath: { eq: "mainnet-globe.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: mainnetYaml {
        launchDate
        seoDescription
        livecastLink
      }
    }
  `);

  return (
    <>
      <SEO
        location={location}
        description={seoDescription}
        title="Regen Mainnet"
        imageUrl={background.publicURL}
      />
      <TopSection />
      <LaunchInfoSection />
      <WhatsNextSection />
      <MediaSection />
      {new Date() < new Date(launchDate) && (
        <FixedFooter justify="flex-end">
          <ContainedButton href={livecastLink} target="_blank" rel="noopener noreferrer">
            Register for Mainnet Livecast
          </ContainedButton>
        </FixedFooter>
      )}
    </>
  );
};

export default Mainnet;
