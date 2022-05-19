import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

import SEO from '../components/seo';
import TopSection from '../sections/mainnet/TopSection';
import LaunchInfoSection from '../sections/mainnet/LaunchInfoSection';
import WhatsNextSection from '../sections/mainnet/WhatsNextSection';
import MediaSection from '../sections/mainnet/MediaSection';
import { MainnetPageQuery } from '../generated/graphql';

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
