import { Box } from '@mui/material';
import { InferGetStaticPropsType } from 'next';

import BlogSection from '../components/templates/home/Blog/Home.blog';
import CarbonplusSection from '../components/templates/home/CarbonPlus/Home.CarbonPlus';
import ClimateSection from '../components/templates/home/Climate/Home.Climate';
import EcologicalCreditCardsSection from '../components/templates/home/EcologicalCreditCards/Home.EcologicalCreditCards';
import { HomeFoldSection } from '../components/templates/home/HomeFold/Home.HomeFold';
import HomeLedger from '../components/templates/home/Ledger/Home.Ledger';
import MarketplaceSection from '../components/templates/home/Marketplace/Home.Marketplace';
import PartnersSection from '../components/templates/home/Partners/Home.Partners';
import StatsSection from '../components/templates/home/Stats/Home.stats';
import HomeValues from '../components/templates/home/Values/Home.Values';

import {
  BlogSectionDocument,
  BlogSectionQuery,
  HomePageWebDocument,
  HomePageWebQuery,
  PartnersSectionDocument,
  PartnersSectionQuery,
} from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';

export default function Home({
  homeData,
  partnersData,
  blogData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const allHomePageWeb = homeData.data.allHomePageWeb[0];
  const homeFoldData = allHomePageWeb.homeFoldSection;
  const carbonPlusData = allHomePageWeb.carbonPlusSection;
  const climateData = allHomePageWeb.climateSection;
  const marketplaceData = allHomePageWeb.marketplaceSection;
  const ecologicalCreditCardsData =
    allHomePageWeb.homeWebEcologicalCreditCardsSection;
  const statsData = allHomePageWeb.homeWebStatsSection;
  const valuesData = allHomePageWeb.valuesSection;
  const ledgerDescription = allHomePageWeb.ledgerDescription;

  return (
    <>
      <Box sx={{ overflow: 'hidden' }}>
        <HomeFoldSection homeFoldData={homeFoldData} />
        <CarbonplusSection carbonPlusData={carbonPlusData} />
        <ClimateSection climateData={climateData} />
        <MarketplaceSection marketplaceData={marketplaceData} />
        <PartnersSection partnersData={partnersData} />
        <EcologicalCreditCardsSection
          ecologicalCreditCardsData={ecologicalCreditCardsData}
        />
        <StatsSection statsData={statsData} />
        <HomeValues valuesData={valuesData} />
        <HomeLedger ledgerDescription={ledgerDescription} />
        <BlogSection blogData={blogData} />
      </Box>
    </>
  );
}

export const getStaticProps = async () => {
  const [homeData, partnersData, blogData] = await Promise.all([
    sanityClient.query<HomePageWebQuery>({
      query: HomePageWebDocument,
    }),
    sanityClient.query<PartnersSectionQuery>({
      query: PartnersSectionDocument,
    }),
    sanityClient.query<BlogSectionQuery>({
      query: BlogSectionDocument,
    }),
  ]);

  return {
    props: {
      homeData,
      partnersData,
      blogData,
    },
  };
};
