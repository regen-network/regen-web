import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { navigate } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/buyers/TopSection';
import ImageGridSection from '../sections/buyers/ImageGridSection';
// import ApproachSection from '../sections/buyers/ApproachSection';
// import InvestingSection from '../sections/buyers/InvestingSection';
import MoreInfoForm from 'web-components/src/components/form/MoreInfoForm';
import FeaturedSection from '../sections/shared/FeaturedSection';
import ComingSoonSection from '../sections/shared/ComingSoonSection';
import FAQSection from '../sections/buyers/FAQSection';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import Modal from 'web-components/lib/components/modal';
import Banner from 'web-components/lib/components/banner';

// const useStyles = makeStyles((theme: Theme) => ({
//   callButton: {
//     marginLeft: theme.spacing(4.25),
//     [theme.breakpoints.down('xs')]: {
//       padding: `${theme.spacing(1.875)} ${theme.spacing(7.5)}`,
//       fontSize: '1.125rem',
//     },
//     [theme.breakpoints.up('sm')]: {
//       padding: `${theme.spacing(2.5)} ${theme.spacing(12.5)}`,
//       fontSize: '1.3125rem',
//     },
//   },
// }));

interface props {
  location: object;
}

const BuyersPage = ({ location }: props): JSX.Element => {
  const [open, setOpen] = useState(false);
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

  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "maximize-impact.png" }) {
        publicURL
      }
    }
  `);

  return (
    <>
      <SEO
        location={location}
        description="Buy carbon credits and other ecosystem system service credits to meet your climate commitments and sustainability goals."
        title="For Buyers"
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection />
      <ImageGridSection />
      {/* <ApproachSection />
      <InvestingSection /> */}
      <FeaturedSection />
      <ComingSoonSection />
      <FAQSection />
      <FixedFooter justify="flex-end">
        <>
          <ContainedButton onClick={handleOpen} startIcon={<EmailIcon />}>
            send me more info
          </ContainedButton>
          {/* {<OutlinedButton className={classes.callButton} startIcon={<PhoneIcon />}>schedule a call</OutlinedButton>} */}
        </>
      </FixedFooter>
      <Modal open={open} onClose={handleClose}>
        <MoreInfoForm
          apiUrl={process.env.GATSBY_API_URI}
          onClose={handleClose}
          onSubmit={() => {
            navigate('/buyers', {
              state: { submitted: true },
              replace: true,
            });
          }}
        />
      </Modal>
      {location && location.state && location.state.submitted && (
        <Banner text="Thanks for submitting your information!" />
      )}
    </>
  );
};

export default BuyersPage;
