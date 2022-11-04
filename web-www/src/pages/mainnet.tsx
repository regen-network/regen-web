import React from 'react';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import FixedFooter from '@regen-network/web-components/lib/components/fixed-footer';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import SEO from '../components/seo';
import { MainnetPageQuery } from '../generated/graphql';
import LaunchInfoSection from '../sections/mainnet/LaunchInfoSection';
import MediaSection from '../sections/mainnet/MediaSection';
import TopSection from '../sections/mainnet/TopSection';
import WhatsNextSection from '../sections/mainnet/WhatsNextSection';

const query = graphql`
  query mainnetPage {
    background: file(relativePath: { eq: "mainnet-globe.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityMainnetPage {
      launchDate
      seoDescription
      livecastLink
    }
  }
`;

const Mainnet: React.FC<PageProps> = ({ location }) => {
  const { background, sanityMainnetPage: data } =
    useStaticQuery<MainnetPageQuery>(query);
  const launchDate = data?.launchDate || new Date();

  return (
    <>
      <SEO
        location={location}
        description={data?.seoDescription || ''}
        title="Regen Mainnet"
        imageUrl={background?.childImageSharp?.fluid?.src}
      />
      <TopSection />
      <LaunchInfoSection />
      <WhatsNextSection />
      <MediaSection />
      {new Date() < new Date(launchDate) && data?.livecastLink && (
        <FixedFooter justifyContent="flex-end">
          <ContainedButton
            href={data?.livecastLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Register for Mainnet Livecast
          </ContainedButton>
        </FixedFooter>
      )}
    </>
  );
};

export default Mainnet;
