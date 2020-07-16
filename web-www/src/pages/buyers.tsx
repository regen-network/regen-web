import React, { useState, useEffect } from 'react';

import SEO from '../components/seo';
import TopSection from '../sections/buyers/TopSection';
import ApproachSection from '../sections/buyers/ApproachSection';
import InvestingSection from '../sections/buyers/InvestingSection';
import MoreInfoForm from '../sections/buyers/MoreInfoForm';
import FeaturedSection from '../sections/shared/FeaturedSection';
import ComingSoonSection from '../sections/shared/ComingSoonSection';
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

const BuyersPage = ({ location }): JSX.Element => {
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

  return (
    <>
      <SEO title="For Buyers" />
      <TopSection />
      <ApproachSection />
      <InvestingSection />
      <FeaturedSection />
      <ComingSoonSection />
      <FixedFooter justify="flex-end">
        <>
          <ContainedButton onClick={handleOpen} startIcon={<EmailIcon />}>
            send me more info
          </ContainedButton>
          {/* {<OutlinedButton className={classes.callButton} startIcon={<PhoneIcon />}>schedule a call</OutlinedButton>} */}
        </>
      </FixedFooter>
      <Modal open={open} onClose={handleClose}>
        <MoreInfoForm onClose={handleClose} />
      </Modal>
      {location && location.state && location.state.submitted &&
      <Banner text="Thanks for submitting your information!" />}
    </>
  );
};

export default BuyersPage;
