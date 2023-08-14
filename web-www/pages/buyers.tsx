import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import { HeroAction } from '@/components/molecules/HeroAction/HeroAction';
import { HeroTitle } from '@/components/molecules/HeroTitle/HeroTitle';
import { ImageGridSection } from '@/components/molecules/ImageGridSection/ImageGridSection';
import { ImageItemsSection } from '@/components/molecules/ImageItemsSection/ImageItemsSection';
import { BuyersEcologicalCreditCardsSection } from '@/components/templates/buyers/Buyers.EcologicalCreditCardsSection';
import { BuyersFeaturedProjectsSection } from '@/components/templates/buyers/Buyers.FeaturedProjectsSection';
import { BuyersPartnersSection } from '@/components/templates/buyers/Buyers.PartnersSection';
import { BuyersQuoteSection } from '@/components/templates/buyers/Buyers.QuoteSection';
import { useBuyersStyles } from '@/components/templates/buyers/Buyers.styles';
import {
  AllBuyersPageDocument,
  AllBuyersPageQuery,
} from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';

export default function BuyersPage({
  buyersPageData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const { classes: styles } = useBuyersStyles();

  const content = buyersPageData.data.allBuyersPage?.[0];

  const siteMetadata = {
    title: 'For Buyers',
    description:
      content?.metadata?.description ||
      'Buy carbon credits and other ecosystem system service credits to meet your climate commitments and sustainability goals.',
    author: 'Regen Network Development, PBC',
    imageUrl: content?.metadata?.openGraphImage?.asset?.url || '',
  };

  return (
    <>
      <NextSeo
        description={siteMetadata.description}
        title={siteMetadata.title}
        openGraph={{
          images: [
            {
              url: siteMetadata.imageUrl,
              width: 720,
              height: 545,
            },
          ],
        }}
      />
      <>
        <HeroTitle
          classes={{ main: styles.heroMain }}
          isBanner
          title={content?.heroSection?.title}
          descriptionRaw={content?.heroSection?.descriptionRaw}
          tooltipText={content?.heroSection?.tooltipText}
          img={
            content?.heroSection?.backgroundImage?.image?.asset?.url ||
            content?.heroSection?.backgroundImage?.imageHref ||
            '/images/buyers/buyers-top.jpg'
          }
          linearGradient="linear-gradient(209.5deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)"
        />
        {content?.ecologicalCreditsSection && (
          <ImageItemsSection
            content={content?.ecologicalCreditsSection}
            sx={{
              description: {
                maxWidth: 790,
                marginX: 'auto',
              },
              imageItem: {
                title: { pt: 7.5 },
              },
            }}
          />
        )}
        {content?.imageGridSection && (
          <ImageGridSection
            content={content?.imageGridSection}
            sx={{
              borderTop: theme => `1px solid ${theme.palette.grey[100]}`,
              borderBottom: theme => `1px solid ${theme.palette.grey[100]}`,
            }}
          />
        )}
        {content?.ecologicalCreditCardsSection && (
          <BuyersEcologicalCreditCardsSection
            content={content?.ecologicalCreditCardsSection}
          />
        )}
        {content?.featuredProjectCardsSection && (
          <BuyersFeaturedProjectsSection
            content={content?.featuredProjectCardsSection}
          />
        )}
        {content?.quoteSection && (
          <BuyersQuoteSection content={content?.quoteSection} />
        )}
        {content?.partnersSection && (
          <BuyersPartnersSection content={content?.partnersSection} />
        )}
        {content?.contactSection && (
          <HeroAction
            classes={{ section: styles.bottomHeroSection }}
            isBanner={false}
            img={content?.contactSection?.image?.image?.asset?.url || ''}
            bottomBanner={content?.contactSection}
            openModal={() => null}
          />
        )}
      </>
    </>
  );
}

export { BuyersPage };

export const getStaticProps = async () => {
  const buyersPageData = await sanityClient.query<AllBuyersPageQuery>({
    query: AllBuyersPageDocument,
  });

  return {
    props: {
      buyersPageData,
    },
  };
};
