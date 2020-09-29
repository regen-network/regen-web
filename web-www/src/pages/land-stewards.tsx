import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/land-stewards/TopSection';
import ImageItemsSection from '../sections/land-stewards/ImageItemsSection';
import JoinFarmersSection from '../sections/land-stewards/JoinFarmersSection';
import PracticesOutcomesSection from '../sections/land-stewards/PracticesOutcomesSection';
import MoreQuestionsSection from '../sections/land-stewards/MoreQuestionsSection';
import TimelineSection from '../sections/land-stewards/TimelineSection';
import FeaturedSection from '../sections/shared/FeaturedSection';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import Modal from 'web-components/lib/components/modal';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

interface props {
  location: object;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

const LandStewardsPage = ({ location }: props): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "land-stewards-top.jpg" }) {
        publicURL
      }
    }
  `);

  return (
    <>
      <SEO
        description="Issue and sell ecosystem service credits to buyers around the world - get paid for your ecological stewardship."
        title="For Land Stewards"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection />
      <ImageItemsSection />
      <JoinFarmersSection />
      <PracticesOutcomesSection />
      <TimelineSection />
      <FeaturedSection />
      <MoreQuestionsSection />
      <FixedFooter justify="flex-end">
        <>
          <ContainedButton onClick={handleOpen}>sign up now</ContainedButton>
        </>
      </FixedFooter>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <iframe title="airtable-signup-form" src="https://airtable.com/embed/shrs5XjNI8ugXEDS0" />
      </Modal>
    </>
  );
};

export default LandStewardsPage;
