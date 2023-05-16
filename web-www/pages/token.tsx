import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import EmailSubmitSection from '@/components/templates/shared/EmailSubmitSection/EmailSubmitSection';
import BlockExplorerSection from '@/components/templates/token/BlockExplorerSection/BlockExplorerSection';
import TokenInfoSection from '@/components/templates/token/InfoSection/InfoSection';
import MediaSection from '@/components/templates/token/MediaSection/MediaSection';
import Staking from '@/components/templates/token/Stacking/Staking';
import TokenConnectSection from '@/components/templates/token/TokenConnectSection/TokenConnectSection';
import TokenEconomics from '@/components/templates/token/TokenEconomics/TokenEconomics';
import TokenPool from '@/components/templates/token/TokenPool/TokenPool';
import TopSection from '@/components/templates/token/TopSection/TopSection';
import {
  SharedSectionDocument,
  SharedSectionQuery,
  TokenPageDocument,
  TokenPageQuery,
} from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';

export default function TokenPage({
  tokenPageData,
  sharedSectionData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const tokenPage = tokenPageData.data.allTokenPage[0];
  const topSection = tokenPage.topSection;
  const tokenEconomics = tokenPage.tokenEconomics;
  const infoSection = tokenPage.infoSection;
  const tokenPool = tokenPage.poolSection;
  const blockExplorerSection = tokenPage.blockExplorerSection;
  const stakingSection = tokenPage.stakingSection;
  const newsletterContent = tokenPage.newsletterSection;
  const sharedNewsletterData =
    sharedSectionData.data.allSharedSections[0].newsletter;

  return (
    <>
      <NextSeo
        description={topSection?.body ?? ''}
        title={topSection?.title ?? ''}
        openGraph={{
          images: [
            { url: '/images/token/token-aurora.jpg', width: 1140, height: 629 },
          ],
        }}
      />
      <TopSection topSectionData={topSection} />
      <TokenEconomics tokenEconomicsData={tokenEconomics} />
      <TokenInfoSection tokenInfoData={infoSection} />
      <TokenPool tokenPoolData={tokenPool} />
      <BlockExplorerSection blockExplorerData={blockExplorerSection} />
      <Staking stakingSectionData={stakingSection} />
      <TokenConnectSection tokenConnectData={tokenPage} />
      <MediaSection tokenMediaData={tokenPage} />
      <EmailSubmitSection
        sharedNewsletterData={sharedNewsletterData}
        altContent={{
          header: newsletterContent?.header || '',
          buttonText: newsletterContent?.buttonText || '',
          inputText: newsletterContent?.inputText || '',
        }}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const [tokenPageData, sharedSectionData] = await Promise.all([
    sanityClient.query<TokenPageQuery>({
      query: TokenPageDocument,
    }),
    sanityClient.query<SharedSectionQuery>({
      query: SharedSectionDocument,
    }),
  ]);

  return {
    props: {
      tokenPageData,
      sharedSectionData,
    },
  };
};
