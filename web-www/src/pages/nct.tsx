import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import SEO from '../components/seo';
import type { NctPageQuery } from '../generated/graphql';
import {
  BannerSection,
  LedgerSection,
  MarketplaceSection,
  MediaSection,
  OverviewSection,
  TokenSection,
  TopSection,
} from '../sections/nct';

const query = graphql`
  query nctPage {
    sanityNctPage {
      seo {
        title
        description
        image {
          asset {
            url
          }
        }
      }
    }
  }
`;

const NctPage: React.FC<PageProps> = ({ location }) => {
  const { sanityNctPage } = useStaticQuery<NctPageQuery>(query);
  const data = sanityNctPage?.seo;
  return (
    <>
      <SEO
        location={location}
        title={data?.title || ''}
        description={data?.description || ''}
        imageUrl={data?.image?.asset?.url || ''}
      />
      <TopSection />
      <OverviewSection />
      <TokenSection />
      <BannerSection />
      <MarketplaceSection />
      <LedgerSection />
      <MediaSection />
    </>
  );
};

export default NctPage;
