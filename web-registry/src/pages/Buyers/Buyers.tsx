import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import Modal from 'web-components/lib/components/modal';
import SEO from 'web-components/lib/components/seo';

import buyersHero from '../../assets/buyers-top.jpg';
import {
  FeaturedSection,
  HeroAction,
  HeroTitle,
  ImageGridSection,
  ImageItemsSection,
} from '../../components/molecules';
import { MoreProjectsSection } from '../../components/organisms';
import { useMoreProjectsQuery } from '../../generated/graphql';
import { useAllBuyersPageQuery } from '../../generated/sanity-graphql';
import { client } from '../../lib/clients/sanity';
import { useBuyersStyles } from './Buyers.styles';

const BuyersPage = (): JSX.Element => {
  const { classes: styles } = useBuyersStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { data } = useAllBuyersPageQuery({ client });
  const content = data?.allBuyersPage?.[0];
  const { data: projectsData } = useMoreProjectsQuery();

  const siteMetadata = {
    title: 'For Buyers',
    description:
      content?.metadata?.description ||
      'Buy carbon credits and other ecosystem system service credits to meet your climate commitments and sustainability goals.',
    author: 'Regen Network Development, Inc.',
    siteUrl: window.location.href,
    imageUrl: content?.metadata?.openGraphImage?.asset?.url || '',
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
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
        <ImageGridSection content={content?.imageGridSection} />
      )}
      {content?.faqSection && (
        <HeroAction
          classes={{ section: styles.bottomHeroSection }}
          isBanner
          img={content?.faqSection?.image?.image?.asset?.url || ''}
          bottomBanner={content?.faqSection}
          openModal={() => null}
        />
      )}

      <FixedFooter justifyContent="flex-end">
        <>
          <ContainedButton
            size="large"
            onClick={handleOpen}
            startIcon={<EmailIcon />}
          >
            {content?.footerButtonText}
          </ContainedButton>
        </>
      </FixedFooter>
      <Modal open={open} onClose={handleClose} isIFrame>
        <iframe
          title="airtable-buyer-intake"
          src="https://airtable.com/embed/shrijZlxJdSmj7H8J?backgroundColor=green"
        />
      </Modal>
    </>
  );
};

export { BuyersPage };
