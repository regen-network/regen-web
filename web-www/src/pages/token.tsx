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

interface Props {
  location: Location;
}

const TokenPage = ({ location }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "token-aurora.png" }) {
        publicURL
      }
    }
  `);

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
    </>
  );
};

export default TokenPage;
