import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import AccountabilityIcon from 'web-components/lib/components/icons/AccountabilityIcon';
import FarmerIcon from 'web-components/lib/components/icons/FarmerIcon';
import InterfaceIcon from 'web-components/lib/components/icons/InterfaceIcon';
import RegistrationIcon from 'web-components/lib/components/icons/RegistrationIcon';
import ReviewIcon from 'web-components/lib/components/icons/ReviewIcon';
import ShadedCreditsIcon from 'web-components/lib/components/icons/ShadedCreditsIcon';
import TrustDocumentIcon from 'web-components/lib/components/icons/TrustDocumentIcon';
import TrustIcon from 'web-components/lib/components/icons/TrustIcon';
import StepCard, { ProjectPlanStep } from 'web-components/lib/components/cards/StepCard';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import { QuestionItem } from 'web-components/lib/components/faq/Question';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    paddingTop: theme.spacing(12),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7),
    },
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

// TODO: move copy to mocks.json and query.  See issue #538
const questionItems: QuestionItem[] = [
  {
    question: 'How do I implement the land management practices?',
    answer:
      'you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do.',
  },
  {
    question: 'Lorem ipsum dolor sit apsicing sit amut?',
    answer:
      'you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do.',
  },
  {
    question: 'How do i so and so?',
    answer:
      'you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do. you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do. you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do.',
  },
  {
    question: 'How do i so and so again?',
    answer:
      'you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do.',
  },
];

const steps: ProjectPlanStep[] = [
  {
    stepNumber: 1,
    title: 'Fill out a project plan',
    tagName: 'immediate',
    isActive: true,
    description:
      'This project plan includes all the details about your monitoring, management practices, and more.',
    faqs: [],
  },
  {
    stepNumber: 2,
    title: 'Review and Submit',
    tagName: 'immediate',
    isActive: true,
    description: 'Review your project plan to make sure all entries are correct.',
  },
  {
    stepNumber: 3,
    title: 'Sign a contract and project officially starts',
    tagName: 'immediate',
    isActive: true,
    description:
      '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. <a href="https://regen.network" target="_blank" rel="noopener noreferrer">Read full documentation»</a></span>',
    faqs: questionItems,
  },
  {
    stepNumber: 4,
    title: 'Create a project page',
    tagName: 'immediate',
    isActive: false,
    description: 'This marketing page help advertise your project to potential buyers.',
  },
  {
    stepNumber: 5,
    title:
      'Hire a monitor to establish a baseline measurement and additional monitoring rounds (if applicable)',
    tagName: 'within 60 days',
    isActive: false,
    description:
      '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. <a href="https://regen.network" target="_blank" rel="noopener noreferrer">Read full documentation»</a></span>',
    faqs: questionItems,
  },
  {
    stepNumber: 6,
    title: 'Implement land management',
    tagName: 'within 3 months',
    isActive: false,
    description:
      '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. <a href="https://regen.network" target="_blank" rel="noopener noreferrer">Read full documentation»</a></span>',
    faqs: questionItems,
    video: 'https://www.youtube.com/embed/Eh19aQ1dd7c',
  },
  {
    stepNumber: 7,
    title: 'Hire a verifier as needed given the verification schedule',
    tagName: 'within 6 months',
    isActive: false,
    description:
      '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. <a href="https://regen.network" target="_blank" rel="noopener noreferrer">Read full documentation»</a></span>',
    faqs: questionItems,
  },
  {
    stepNumber: 8,
    title: 'Hire a broker or sell through Regen Network',
    tagName: 'variable',
    description:
      '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. <a href="https://regen.network" target="_blank" rel="noopener noreferrer">Read full documentation»</a></span>',
    faqs: questionItems,
  },
];

const GettingStarted: React.FC = () => {
  const classes = useStyles();
  const [stepsMap, setStepsMap] = useState<any>({});

  // TODO: maybe just organize JSON this way (indexed by stepNumber)?
  const indexStepsByStepNumber = (): any => {
    return Object.assign({}, ...steps.map(x => ({ [x.stepNumber]: x })));
  };

  useEffect(() => {
    const indexedSteps = indexStepsByStepNumber();
    setStepsMap(indexedSteps);
  }, []);

  return (
    <OnBoardingSection formContainer title="Getting Started">
      <div className={classes.content}>
        <StepCard step={stepsMap['1']} icon={<InterfaceIcon className={classes.interfaceIcon} />} />
        <StepCard step={stepsMap['2']} icon={<ReviewIcon className={classes.reviewIcon} />} />
        <StepCard step={stepsMap['3']} icon={<TrustDocumentIcon className={classes.trustDocumentIcon} />} />
        <StepCard step={stepsMap['4']} icon={<RegistrationIcon className={classes.registrationIcon} />} />
        <StepCard step={stepsMap['5']} icon={<AccountabilityIcon className={classes.accountabilityIcon} />} />
        <StepCard step={stepsMap['6']} icon={<FarmerIcon className={classes.farmerIcon} />} />
        <StepCard step={stepsMap['7']} icon={<TrustIcon className={classes.trustIcon} />} />
        <StepCard step={stepsMap['8']} icon={<ShadedCreditsIcon className={classes.creditsIcon} />} />
      </div>
    </OnBoardingSection>
  );
};

export default GettingStarted;
