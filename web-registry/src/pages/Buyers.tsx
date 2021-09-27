import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import { client } from '../sanity';
import { useAllBuyersPageQuery } from '../generated/sanity-graphql';

import SEO from 'web-components/lib/components/seo';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import Modal from 'web-components/lib/components/modal';
import Banner from 'web-components/lib/components/banner';

// import ImageGridSection from '../sections/buyers/ImageGridSection';
// import FAQSection from '../sections/buyers/FAQSection';

import { HeroTitle, FeaturedSection, HeroAction } from '../components/molecules';
import { MoreProjectsSection } from '../components/organisms';

import buyersHero from '../assets/buyers-top.jpg';
import mock from '../mocks/mock.json';
import { Project } from '../mocks';

const useStyles = makeStyles((theme: Theme) => ({
  heroMain: {
    maxWidth: theme.typography.pxToRem(775),
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(12),
    },
  },
  bottomHeroSection: {
    paddingTop: 0,
  },

  // callButton: {
  //   marginLeft: theme.spacing(4.25),
  //   [theme.breakpoints.down('xs')]: {
  //     padding: `${theme.spacing(1.875)} ${theme.spacing(7.5)}`,
  //     fontSize: '1.125rem',
  //   },
  //   [theme.breakpoints.up('sm')]: {
  //     padding: `${theme.spacing(2.5)} ${theme.spacing(12.5)}`,
  //     fontSize: '1.3125rem',
  //   },
  // },

  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));

const BuyersPage = (): JSX.Element => {
  const styles = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { data } = useAllBuyersPageQuery({ client });
  const content = data?.allBuyersPage?.[0];
  const projects: Project[] = mock?.projects;

  const siteMetadata = {
    title: `For Buyers`,
    description: content?.metadata?.description || '',
    author: `RND, Inc.`, //TODO
    siteUrl: window.location.href,
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    if (location && location.state && location.state.submitted) {
      setOpen(false);
    }
  }, [location]);

  return (
    <>
      <SEO
        location={location}
        description={
          siteMetadata.description ||
          'Buy carbon credits and other ecosystem system service credits to meet your climate commitments and sustainability goals.'
        }
        title={siteMetadata.title}
        imageUrl={content?.metadata?.openGraphImage?.asset?.url || buyersHero}
        siteMetadata={siteMetadata}
      />
      <HeroTitle
        classes={{ main: styles.heroMain }}
        isBanner
        title={content?.heroSection?.title}
        descriptionRaw={content?.heroSection?.descriptionRaw}
        tooltipText={content?.heroSection?.tooltipText}
        img={buyersHero}
        linearGradient="linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(209.5deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)"
      />
      {/* <ImageGridSection /> */}

      {/* <ApproachSection />
      <InvestingSection /> */}

      {content?.featuredSection && <FeaturedSection content={content?.featuredSection} />}
      {projects?.length > 0 ? (
        <div className="topo-background">
          <MoreProjectsSection classes={{ title: styles.title }} title={'Projects'} projects={projects} />
        </div>
      ) : (
        <></>
      )}
      {content?.faqSection && (
        <HeroAction
          classes={{ section: styles.bottomHeroSection }}
          isBanner
          img={content?.faqSection?.image?.image?.asset?.url || ''}
          bottomBanner={content?.faqSection}
          openModal={() => {}}
        />
      )}

      <FixedFooter justify="flex-end">
        <>
          <ContainedButton onClick={handleOpen} startIcon={<EmailIcon />}>
            {content?.footerButtonText}
          </ContainedButton>
          {/* {<OutlinedButton className={classes.callButton} startIcon={<PhoneIcon />}>schedule a call</OutlinedButton>} */}
        </>
      </FixedFooter>
      <Modal open={open} onClose={handleClose}>
        <MoreInfoForm
          apiUrl={process.env.REACT_APP_API_URI || ''}
          onClose={handleClose}
          onSubmit={() => setSubmitted(true)}
        />
      </Modal>
      {submitted && <Banner text="Thanks for submitting your information!" />}
    </>
  );
};

export { BuyersPage };
