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
    livecastLink: string;
    launchDate: string;
  };
};

const Mainnet = ({ location }: Props): JSX.Element => {
  const {
    background,
    text: { livecastLink, launchDate },
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
        livecastLink
      }
    }
  `);

  return (
    <>
      <SEO
        location={location}
        description="With the help of our fantastic community and extraordinary team, mainnet is on the horizon!" // TODO: What should this text say?
        title="For Buyers"
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
