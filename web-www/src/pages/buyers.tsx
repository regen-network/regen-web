import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import SEO from '../components/seo';
import TopSection from '../sections/buyers/TopSection';
import ApproachSection from '../sections/buyers/ApproachSection';
import InvestingSection from '../sections/buyers/InvestingSection';
import FeaturedSection from '../sections/shared/FeaturedSection';
import ComingSoonSection from '../sections/shared/ComingSoonSection';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import PhoneIcon from 'web-components/lib/components/icons/PhoneIcon';

const useStyles = makeStyles((theme: Theme) => ({
  callButton: {
    marginLeft: theme.spacing(4.25),
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(1.875)} ${theme.spacing(7.5)}`,
      fontSize: '1.125rem',
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(12.5)}`,
      fontSize: '1.3125rem',
    },
  },
}));

const BuyersPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <SEO title="For Buyers" />
      <TopSection />
      <ApproachSection />
      <InvestingSection />
      <FeaturedSection />
      <ComingSoonSection />
      <FixedFooter>
        <>
          <ContainedButton startIcon={<EmailIcon />}>
            send me more info
          </ContainedButton>
          <OutlinedButton className={classes.callButton} startIcon={<PhoneIcon />}>schedule a call</OutlinedButton>
        </>
      </FixedFooter>
    </>
  )
};

export default BuyersPage;
