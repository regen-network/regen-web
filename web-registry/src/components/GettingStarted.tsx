import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(6),
  },
  interfaceIcon: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  reviewIcon: {
    width: theme.spacing(23.285),
    height: theme.spacing(23.675),
    marginTop: theme.spacing(3.5),
    marginLeft: theme.spacing(3.5),
  },
  trustDocumentIcon: {
    width: theme.spacing(14.855),
    height: theme.spacing(18.75),
  },
  registrationIcon: {
    width: theme.spacing(25),
    height: theme.spacing(18.5175),
  },
  accountabilityIcon: {
    width: theme.spacing(26.5),
    height: theme.spacing(26.5),
    marginTop: theme.spacing(1),
  },
  farmerIcon: {
    width: theme.spacing(17.5),
    height: theme.spacing(15.75),
  },
  trustIcon: {
    width: theme.spacing(20.4975),
    height: theme.spacing(23.3225),
  },
  creditsIcon: {
    width: theme.spacing(22.475),
    height: theme.spacing(24.64),
    marginTop: theme.spacing(1.75),
    marginRight: theme.spacing(1.75),
  },
}));

const GettingStarted: React.FC = () => {
  const classes = useStyles();

  const questionItems = [
    {
      question: 'How do i so and so?',
      answer:
        '<p>you just do. you just do. you just do. ok okok okok </p><p>okookok ABC123 okokokok ok. you just do. you just do. you just do. </p>',
    },
    {
      question: 'How do i so and so? Like really what do i do?',
      answer:
        '<p>you just do. you just do. you just do. ok okok okok </p><p>okookok ABC123 okokokok ok. you just do. you just do. you just do. </p>',
    },
    {
      question: 'How do i so and so?',
      answer:
        '<p>you just do. you just do. you just do. ok okok okok </p><p>okookok ABC123 okokokok ok. you just do. you just do. you just do. </p>',
    },
    {
      question: 'How do i so and so?',
      answer:
        '<p>you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do. </p>',
    },
  ];

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
            <a href="https://regen.network" target="_blank" rel="noopener noreferrer">
              Read full documentation»
            </a>
          </span>
        }
        questionItems={questionItems}
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
        questionItems={questionItems}
        video="https://www.youtube.com/embed/Eh19aQ1dd7c"
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
        icon={<ShadedCreditsIcon className={classes.creditsIcon} />}
        tagName="variable"
        stepText="step 8"
        title="Hire a broker or sell through Regen Network"
        description={
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
            <a href="https://regen.network"> Read full documentation»</a>
          </span>
        }
        questionItems={questionItems}
      />
    </div>
  );
};

export default GettingStarted;
