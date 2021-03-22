import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import AccountabilityIcon from 'web-components/lib/components/icons/AccountabilityIcon';
import FarmerIcon from 'web-components/lib/components/icons/FarmerIcon';
import InterfaceIcon from 'web-components/lib/components/icons/InterfaceIcon';
import RegistrationIcon from 'web-components/lib/components/icons/RegistrationIcon';
import ReviewIcon from 'web-components/lib/components/icons/ReviewIcon';
import ShadedCreditsIcon from 'web-components/lib/components/icons/ShadedCreditsIcon';
import TrustDocumentIcon from 'web-components/lib/components/icons/TrustDocumentIcon';
import TrustIcon from 'web-components/lib/components/icons/TrustIcon';
import StepCard from 'web-components/lib/components/cards/StepCard';
import Title from 'web-components/lib/components/title';

type Props = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '25%',
      paddingRight: '25%',
    },
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(8),
  },
  interfaceIcon: {
    width: 100,
    height: 100,
  },
  reviewIcon: {
    width: 93.14, //TODO
    height: 94.7,
    marginTop: 14,
    marginLeft: 14,
  },
  trustDocumentIcon: {
    width: 59.42,
    height: 75,
  },
  registrationIcon: {
    width: 100,
    height: 74.07,
  },
  accountabilityIcon: {
    width: 106,
    height: 106,
    marginTop: 4,
  },
  farmerIcon: {
    width: 70,
    height: 63,
  },
  trustIcon: {
    width: 81.99,
    height: 93.29,
  },
  creditsIcon: {
    width: 89.9,
    height: 98.56,
    marginTop: 7,
    marginRight: 7,
  },
}));

const GettingStarted: React.FC<Props> = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Title variant="h3" className={classes.title}>
        Getting Started
      </Title>
      <StepCard
        icon={<InterfaceIcon className={classes.interfaceIcon} />}
        tagName="immediate"
        stepText="step 1"
        isActive
        title="Fill out a project plan"
        description="This project plan includes all the details about your monitoring, management practices, and more."
      />
      <StepCard
        icon={<ReviewIcon className={classes.reviewIcon} />}
        tagName="immediate"
        stepText="step 2"
        isActive
        title="Review and Submit"
        description="Review your project plan to make sure all entries are correct."
      />
      <StepCard
        icon={<TrustDocumentIcon className={classes.trustDocumentIcon} />}
        tagName="immediate"
        stepText="step 3"
        isActive
        title="Fill out a project plan"
        description={
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
            <a href="https://regen.network"> Read full documentation»</a>
          </span>
        }
      />
      <StepCard
        icon={<RegistrationIcon className={classes.registrationIcon} />}
        tagName="immediate"
        stepText="step 4"
        title="Create a project page"
        description="This marketing page help advertise your project to potential buyers."
      />
      <StepCard
        icon={<AccountabilityIcon className={classes.accountabilityIcon} />}
        tagName="within 60 days"
        stepText="step 5"
        title="Hire a monitor to establish a baseline measurement and additional monitoring rounds (if applicable)"
        description={
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
            <a href="https://regen.network"> Read full documentation»</a>
          </span>
        }
      />
      <StepCard
        icon={<FarmerIcon className={classes.farmerIcon} />}
        tagName="within 3 months"
        stepText="step 6"
        title="Implement land management"
        description={
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
            <a href="https://regen.network"> Read full documentation»</a>
          </span>
        }
      />
      <StepCard
        icon={<TrustIcon className={classes.trustIcon} />}
        tagName="within 6 months"
        stepText="step 7"
        title="Hire a verifier as needed given the verification schedule"
        description={
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
            <a href="https://regen.network"> Read full documentation»</a>
          </span>
        }
      />
      <StepCard
        icon={<ShadedCreditsIcon className={classes.creditsIcon} color={theme.palette.secondary.main} />}
        tagName="variable"
        stepText="step 8"
        title="Hire a broker or sell through Regen Network"
        description={
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
            <a href="https://regen.network"> Read full documentation»</a>
          </span>
        }
      />
    </div>
  );
};

export default GettingStarted;
