import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import SEO from 'web-components/lib/components/seo';

import buyersHero from '../../assets/buyers-top.jpg';
import {
  HeroAction,
  HeroTitle,
  ImageGridSection,
  ImageItemsSection,
} from '../../components/molecules';
import { useAllBuyersPageQuery } from '../../generated/sanity-graphql';
import { client } from '../../lib/clients/sanity';
import { BuyersEcologicalCreditCardsSection } from './Buyers.EcologicalCreditCardsSection';
import { BuyersFeaturedProjectsSection } from './Buyers.FeaturedProjectsSection';
import { BuyersPartnersSection } from './Buyers.PartnersSection';
import { useBuyersStyles } from './Buyers.styles';
import { useFetchProjectsByClass } from './hooks/useFetchProjectsByClass';

const BuyersPage = (): JSX.Element => {
  const { classes: styles } = useBuyersStyles();
  const location = useLocation();
  const { data } = useAllBuyersPageQuery({ client });
  const content = data?.allBuyersPage?.[0];
  const featuredProjectsCreditClassId =
    content?.featuredProjectCardsSection?.cards?.[0]?.creditClass?.path;
  const { projects, isLoadingProjects } = useFetchProjectsByClass({
    classId: featuredProjectsCreditClassId,
  });

  const siteMetadata = {
    title: 'For Buyers',
    description:
      content?.metadata?.description ||
      'Buy carbon credits and other ecosystem system service credits to meet your climate commitments and sustainability goals.',
    author: 'Regen Network Development, Inc.',
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
      <HeroTitle
        classes={{ main: styles.heroMain }}
        isBanner
        title={content?.heroSection?.title}
        descriptionRaw={content?.heroSection?.descriptionRaw}
        tooltipText={content?.heroSection?.tooltipText}
        img={buyersHero}
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
      {content?.featuredProjectCardsSection && !isLoadingProjects && (
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
      {content?.partnersSection && (
        <BuyersPartnersSection content={content?.partnersSection} />
      )}
      {content?.contactSection && (
        <HeroAction
          classes={{ section: styles.bottomHeroSection }}
          isBanner
          img={content?.contactSection?.image?.image?.asset?.url || ''}
          bottomBanner={content?.contactSection}
          openModal={() => null}
        />
      )}
    </>
  );
};

export { BuyersPage };
