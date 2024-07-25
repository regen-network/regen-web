import { useLocation } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';

import SEO from 'web-components/src/components/seo';

import { getAllBuyersPageQuery } from 'lib/queries/react-query/sanity/getAllBuyersPageQuery/getAllBuyersPageQuery';

import WithLoader from 'components/atoms/WithLoader';

import buyersHero from '../../assets/buyers-top.jpg';
import {
  HeroAction,
  HeroTitle,
  ImageGridSection,
  ImageItemsSection,
} from '../../components/molecules';
import { client as sanityClient } from '../../lib/clients/sanity';
import { BuyersEcologicalCreditCardsSection } from './Buyers.EcologicalCreditCardsSection';
import { BuyersFeaturedProjectsSection } from './Buyers.FeaturedProjectsSection';
import { BuyersPartnersSection } from './Buyers.PartnersSection';
import { BuyersQuoteSection } from './Buyers.QuoteSection';
import { useBuyersStyles } from './Buyers.styles';
import { useFetchProjectsByIds } from './hooks/useFetchProjectsByIds';

const BuyersPage = (): JSX.Element => {
  const { _ } = useLingui();
  const { classes: styles } = useBuyersStyles();
  const location = useLocation();
  const { data, isLoading: isLoadingPage } = useQuery(
    getAllBuyersPageQuery({ sanityClient }),
  );
  const content = data?.allBuyersPage?.[0];
  const featuredProjectIds = content?.featuredProjectCardsSection?.cards?.map(
    card => card?.project?.projectId ?? '',
  );
  const { projects, isProjectsLoading } = useFetchProjectsByIds({
    projectIds: featuredProjectIds,
  });

  const siteMetadata = {
    title: _(msg`For Buyers`),
    description:
      content?.metadata?.description ||
      _(
        msg`Buy carbon credits and other ecosystem system service credits to meet your climate commitments and sustainability goals.`,
      ),
    author: _(msg`Regen Network Development, PBC`),
    siteUrl: window.location.href,
    imageUrl: content?.metadata?.openGraphImage?.asset?.url || '',
  };

  return (
    <>
      <SEO
        location={location}
        description={siteMetadata.description}
        title={siteMetadata.title}
        imageUrl={siteMetadata.imageUrl}
        siteMetadata={siteMetadata}
      />
      <WithLoader
        isLoading={isLoadingPage}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
              buyersHero
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
          {content?.featuredProjectCardsSection && !isProjectsLoading && (
            <BuyersFeaturedProjectsSection
              projects={projects}
              content={content?.featuredProjectCardsSection}
              sx={{
                container: {
                  borderTop: theme => `1px solid ${theme.palette.grey[100]}`,
                  borderBottom: theme => `1px solid ${theme.palette.grey[100]}`,
                },
              }}
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
      </WithLoader>
    </>
  );
};

export { BuyersPage };
