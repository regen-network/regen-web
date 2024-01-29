import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import FixedFooter from 'web-components/src/components/fixed-footer';
import Modal from 'web-components/src/components/modal';
import SEO from 'web-components/src/components/seo';

import { onBtnClick } from 'lib/button';

import landStewardsHero from '../../assets/land-stewards-top.jpg';
import {
  FeaturedSection,
  HeroAction,
  HeroTitle,
  ImageItemsSection,
  PracticesOutcomesSection,
  TimelineSection,
  TwoImageSection,
} from '../../components/molecules';
import { useAllLandStewardsPageQuery } from '../../generated/sanity-graphql';
import { client } from '../../lib/clients/sanity';

const useStyles = makeStyles()(theme => ({
  heroMain: {
    maxWidth: theme.typography.pxToRem(775),
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(12),
      '& h1': {
        lineHeight: '130%',
      },
      '& h4': {
        marginTop: theme.spacing(3),
      },
      '& p': {
        fontSize: theme.typography.pxToRem(18),
        lineHeight: '160%',
      },
    },
  },
  bottomHeroSection: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(56.25),
    paddingBottom: theme.spacing(56.25),
    '& a': {
      color: theme.palette.secondary.light,
      '&:link': {
        textDecoration: 'underline',
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(20),
    },
  },
  bottomHeroMain: {
    maxWidth: theme.spacing(192),
    minHeight: 0,
  },
  bottomHeroButton: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(76),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(72),
      '&:first-child': {
        marginTop: theme.spacing(8),
      },
    },
  },
}));

const LandStewards = (): JSX.Element => {
  const { classes: styles } = useStyles();
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string | undefined>();
  const location = useLocation();

  const openModal = (href?: string | null): void => {
    setModalLink(href || undefined);
    setOpen(true);
  };

  const closeModal = (): void => {
    setOpen(false);
  };

  const { data } = useAllLandStewardsPageQuery({ client });
  const content = data?.allLandStewardsPage?.[0];

  const siteMetadata = {
    title: 'For Land Stewards',
    description:
      content?.metadata?.description ||
      'Issue and sell ecosystem service credits to buyers around the world - get paid for your ecological stewardship.',
    author: 'Regen Network Development, PBC',
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
        img={landStewardsHero}
        linearGradient="linear-gradient(209.83deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%)"
      />
      {content?.designedForFarmersSection && (
        <ImageItemsSection content={content.designedForFarmersSection} />
      )}
      {content?.joinFarmersSection && (
        <TwoImageSection content={content.joinFarmersSection} />
      )}
      {content?.practicesOutcomesSection && (
        <PracticesOutcomesSection content={content.practicesOutcomesSection} />
      )}
      {content?.timelineSection && (
        <TimelineSection content={content.timelineSection} />
      )}
      {content?.featuredSection && (
        <FeaturedSection content={content.featuredSection} />
      )}
      {content?.moreQuestionsSection && (
        <HeroAction
          classes={{
            main: styles.bottomHeroMain,
            section: styles.bottomHeroSection,
            button: styles.bottomHeroButton,
          }}
          img={content?.moreQuestionsSection?.image?.image?.asset?.url || ''}
          bottomBanner={content?.moreQuestionsSection}
          openModal={openModal}
        />
      )}

      <FixedFooter justifyContent="flex-end">
        <ContainedButton
          size="large"
          sx={{ px: { md: 12 } }}
          onClick={() => onBtnClick(openModal, content?.footerButton)}
        >
          {content?.footerButton?.buttonText}
        </ContainedButton>
      </FixedFooter>
      <Modal open={open} onClose={closeModal} isIFrame>
        <iframe title="airtable-signup-land-steward" src={modalLink} />
      </Modal>
    </>
  );
};

export { LandStewards };
