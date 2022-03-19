import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import SEO from '../components/seo';
import {
  BannerSection,
  LedgerSection,
  MarketplaceSection,
  MediaSection,
  OverviewSection,
  TokenSection,
  TopSection,
} from '../sections/nct';

import type { Maybe, NctPageQuery, SanityMedia } from '../generated/graphql';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import Section from 'web-components/lib/components/section';
import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import { sanityMediaToArticleCardProps } from '../util/sanity-transforms';

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
