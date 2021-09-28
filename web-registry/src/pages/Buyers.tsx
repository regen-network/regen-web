import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import SEO from 'web-components/lib/components/seo';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import Modal from 'web-components/lib/components/modal';
import Banner from 'web-components/lib/components/banner';

import { HeroTitle, FeaturedSection, HeroAction, ImageGridSection } from '../components/molecules';
import { MoreProjectsSection } from '../components/organisms';
import { client } from '../sanity';
import { useAllBuyersPageQuery } from '../generated/sanity-graphql';
import buyersHero from '../assets/buyers-top.jpg';
import mock from '../mocks/mock.json';
import { Project } from '../mocks';

// TODO: saving this commented-out yaml because yaml file is getting deleted
// approachSection:
//   header: Our innovative approach directly incentivizes land stewards to do good
//     for the planet
//   imageItems:
//     - header: Maximize ecological return
//       image: ../../static/media/eco-return.svg
//       description: Make a bigger impact–Regen runs without expensive middlemen
//         auditors or verification agencies.
//     - header: Verified outcomes
//       image: ../../static/media/verified-outcomes.svg
//       description: Software-based and remote-sensing monitoring keeps costs low and
//         transparency high.
//     - header: Share impact through story
//       image: ../../static/media/story.svg
//       description: Demonstrate climate commitments to your customers through photos,
//         video, stories, and updates.
// investingSection:
//   header: Investing in Land Stewards
//   note: "*Transaction Costs in Carbon Offset Markets"
//   noteLink: https://www.c-agg.org/wp-content/uploads/Zook_C-AGG_Presentation_March_8.pdf
//   items:
//     - header: < $.30 of every dollar*
//       image: ../../static/media/other-org.svg
//       caption: "other organizations:"
//       description: goes to land stewards
//     - header: "> $.80 of every dollar"
//       image: ../../static/media/buying-through-regen.svg
//       caption: "buying through regen:"
//       description: goes to land stewards

const useStyles = makeStyles((theme: Theme) => ({
  heroMain: {
    maxWidth: theme.typography.pxToRem(775),
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
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
    author: `RND, Inc.`,
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
      {content?.imageGridSection && <ImageGridSection content={content?.imageGridSection} />}
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
