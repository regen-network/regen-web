import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import Modal from 'web-components/lib/components/modal';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import SEO from 'web-components/lib/components/seo';

import { useAllLandStewardsPageQuery } from '../generated/sanity-graphql';
import { client } from '../sanity';
import {
  HeroTitle,
  ImageItemsSection,
  TwoImageSection,
  PracticesOutcomesSection,
  TimelineSection,
  FeaturedSection,
  HeroAction,
} from '../components/molecules';
import landStewardsHero from '../assets/land-stewards-top.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
  heroMain: {
    maxWidth: theme.typography.pxToRem(775),
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(12),
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
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(20),
    },
  },
  bottomHeroMain: {
    maxWidth: theme.spacing(192),
    minHeight: 0,
  },
  bottomHeroDescription: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  bottomHeroButton: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(76),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(72),
      '&:first-child': {
        marginTop: theme.spacing(8),
      },
    },
  },
}));

const LandStewards = (): JSX.Element => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string | undefined>();

  const openModal = (href?: string | null): void => {
    setModalLink(href || undefined);
    setOpen(true);
  };

  const closeModal = (): void => {
    setOpen(false);
  };

  const location = useLocation();
  const { data } = useAllLandStewardsPageQuery({ client });
  const content = data?.allLandStewardsPage?.[0];
  console.log('content', content);

  const siteMetadata = {
    title: `For Land Stewards`,
    description: content?.metadata?.description || '',
    author: `RND, Inc.`, //TODO
    siteUrl: window.location.href,
  };

  return (
    <>
      <SEO
        location={location}
        description={siteMetadata.description}
        title={siteMetadata.title}
        imageUrl={content?.metadata?.openGraphImage?.asset?.url || landStewardsHero} // TODO
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
      {content?.joinFarmersSection && <TwoImageSection content={content.joinFarmersSection} />}
      {content?.practicesOutcomesSection && (
        <PracticesOutcomesSection content={content.practicesOutcomesSection} />
      )}
      {content?.timelineSection && <TimelineSection content={content.timelineSection} />}
      {content?.featuredSection && <FeaturedSection content={content.featuredSection} />}
      {content?.moreQuestionsSection && (
        <HeroAction
          classes={{
            main: styles.bottomHeroMain,
            section: styles.bottomHeroSection,
            description: styles.bottomHeroDescription,
            button: styles.bottomHeroButton,
          }}
          isBanner
          img={content?.moreQuestionsSection?.image?.image?.asset?.url || ''}
          bottomBanner={content?.moreQuestionsSection}
          openModal={openModal}
        />
      )}

      <FixedFooter justify="flex-end">
        <ContainedButton onClick={() => openModal(content?.footerLink || '')}>
          {content?.footerButtonText}
        </ContainedButton>
      </FixedFooter>
      <Modal open={open} onClose={closeModal} className={styles.modal}>
        <iframe title="airtable-signup-land-steward" src={modalLink} />
      </Modal>
    </>
  );
};

export { LandStewards };
