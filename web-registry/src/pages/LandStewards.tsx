import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import cx from 'clsx';

// import TopSection from '../sections/land-stewards/TopSection';
// import ImageItemsSection from '../sections/land-stewards/ImageItemsSection';
// import JoinFarmersSection from '../sections/land-stewards/JoinFarmersSection';
// import PracticesOutcomesSection from '../sections/land-stewards/PracticesOutcomesSection';
// import MoreQuestionsSection from '../sections/land-stewards/MoreQuestionsSection';
// import TimelineSection from '../sections/land-stewards/TimelineSection';
// import FeaturedSection from '../sections/shared/FeaturedSection';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import Modal from 'web-components/lib/components/modal';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import Section from 'web-components/lib/components/section';
import SEO from 'web-components/lib/components/seo';

import { useAllLandStewardsPageQuery } from '../generated/sanity-graphql';
import { client } from '../sanity';
import { HeroTitle } from '../components/molecules';
import landStewardsHero from '../assets/land-stewards-top.jpg';
import { title } from 'process';

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
}));

const LandStewards = (): JSX.Element => {
  const styles = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const location = useLocation();
  const { data } = useAllLandStewardsPageQuery({ client });
  const content = data?.allLandStewardsPage?.[0];
  console.log('content', content);

  const siteMetadata = {
    title: `For Land Stewards`,
    description: content?.metadata?.description || '',
    author: `RND, Inc.`,
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
      <Section withSlider title={content?.imageItemsSection?.title || ''}>
        {content?.imageItemsSection?.imageCards && (
          <ImageItems
            items={content?.imageItemsSection?.imageCards?.map(i => {
              return {
                img: <img src={i?.icon?.asset?.url || ''} alt={`${i?.title} icon`} />,
                title: i?.title || '',
                description: i?.descriptionRaw[0]?.children[0]?.text,
              };
            })}
          />
        )}
      </Section>
      {/*
      <JoinFarmersSection />
      <PracticesOutcomesSection />
      <TimelineSection />
      <FeaturedSection />
      <MoreQuestionsSection startSellerFlow={handleOpen} /> */}
      <FixedFooter justify="flex-end">
        <>{/* <ContainedButton onClick={handleOpen}>{data.text.popup.buttonText}</ContainedButton> */}</>
      </FixedFooter>
      <Modal open={open} onClose={handleClose} className={styles.modal}>
        {/* <iframe title="airtable-signup-form" src={data.text.popup.airtableLink} /> */}
      </Modal>
    </>
  );
};

export { LandStewards };
